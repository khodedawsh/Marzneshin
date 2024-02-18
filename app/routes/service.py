from typing import List

import sqlalchemy
from fastapi import APIRouter, Depends
from fastapi import HTTPException

from app import marznode
from app.db import crud
from app.dependencies import DBDep, sudo_admin
from app.models.service import (ServiceCreate, ServiceModify,
                                ServiceResponse)

router = APIRouter(prefix="/services", dependencies=[Depends(sudo_admin)], tags=['Service'])


@router.post("", response_model=ServiceResponse)
def add_service(new_service: ServiceCreate,
                db: DBDep):
    """
    Add a new service

    - **name** service name
    - **inbounds** list of inbound ids
    """
    try:
        return crud.create_service(db, new_service)
    except sqlalchemy.exc.IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Service by this name already exists")


@router.get("/{id}", response_model=ServiceResponse)
def get_service(id: int, db: DBDep):
    """
    Get Service information with id
    """
    dbservice = crud.get_service(db, id)
    if not dbservice:
        raise HTTPException(status_code=404, detail="Service not found")

    return dbservice


@router.put("/{id}", response_model=ServiceResponse)
async def modify_service(id: int,
                   modification: ServiceModify,
                   db: DBDep):
    """
    Modify Service

    - **name** can be up to 64 characters
    - **inbounds** list of inbound ids. if not specified no change will be applied;
    in case of an empty list all inbounds would be removed.
    """
    # TODO: Update all affected users in nodes
    dbservice = crud.get_service(db, id)
    if not dbservice:
        raise HTTPException(status_code=404, detail="Service not found") 
    old_inbounds = {(i.node_id, i.protocol, i.tag) for i in dbservice.inbounds}
    try:
        response = crud.update_service(db, dbservice, modification)
    except sqlalchemy.exc.IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="problem updating the service")
    else:
        for user in response.users:
            await marznode.operations.update_user(user, old_inbounds=old_inbounds)
        return response


@router.delete("/{id}")
def remove_service(id: int,
                   db: DBDep):
    dbservice = crud.get_service(db, id)
    if not dbservice:
        raise HTTPException(status_code=404, detail="Service not found")
    
    crud.remove_service(db, dbservice)
    return dict()


@router.get("", response_model=List[ServiceResponse])
def get_services(db: DBDep,
                 offset: int = None,
                 limit: int = None):
    return crud.get_services(db)  # , offset, limit)

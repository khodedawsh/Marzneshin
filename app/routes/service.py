import sqlalchemy
from fastapi import APIRouter, Query
from fastapi import HTTPException
from fastapi_pagination.ext.sqlalchemy import paginate
from fastapi_pagination.links import Page

from app import marznode
from app.db import crud
from app.db.models import Service, User
from app.dependencies import DBDep, AdminDep, SudoAdminDep
from app.models.proxy import Inbound
from app.models.service import ServiceCreate, ServiceModify, ServiceResponse
from app.models.user import UserResponse

router = APIRouter(prefix="/services", tags=["Service"])


@router.get("", response_model=Page[ServiceResponse])
def get_services(db: DBDep, admin: AdminDep, name: str = Query(None)):
    query = db.query(Service)

    if name:
        query = query.filter(Service.name.ilike(f"%{name}%"))

    if not admin.is_sudo and not admin.all_services_access:
        query = query.filter(Service.id.in_(admin.service_ids))

    return paginate(query)


@router.post("", response_model=ServiceResponse)
def add_service(new_service: ServiceCreate, db: DBDep, admin: SudoAdminDep):
    """
    Add a new service

    - **name** service name
    - **inbounds** list of inbound ids
    """
    try:
        return crud.create_service(db, new_service)
    except sqlalchemy.exc.IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409, detail="Service by this name already exists"
        )


@router.get("/{id}", response_model=ServiceResponse)
def get_service(id: int, db: DBDep, admin: AdminDep):
    """
    Get Service information with id
    """
    dbservice = crud.get_service(db, id)
    if not dbservice:
        raise HTTPException(status_code=404, detail="Service not found")

    if not (
        admin.is_sudo or admin.all_services_access or id in admin.service_ids
    ):
        raise HTTPException(status_code=403, detail="You're not allowed")

    return dbservice


@router.get("/{id}/users", response_model=Page[UserResponse])
def get_service_users(id: int, db: DBDep, admin: SudoAdminDep):
    """
    Get service users
    """
    service = crud.get_service(db, id)

    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    query = db.query(User).join(User.services).where(Service.id == service.id)

    return paginate(query)


@router.get("/{id}/inbounds", response_model=Page[Inbound])
def get_service_inbounds(id: int, db: DBDep, admin: SudoAdminDep):
    """
    Get service inbounds
    """
    service = crud.get_service(db, id)

    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    query = (
        db.query(Inbound)
        .join(Inbound.services)
        .where(Service.id == service.id)
    )

    return paginate(query)


@router.put("/{id}", response_model=ServiceResponse)
async def modify_service(
    id: int, modification: ServiceModify, db: DBDep, admin: SudoAdminDep
):
    """
    Modify Service

    - **name** can be up to 64 characters
    - **inbounds** list of inbound ids. if not specified no change will be applied;
    in case of an empty list all inbounds would be removed.
    """
    dbservice = crud.get_service(db, id)
    if not dbservice:
        raise HTTPException(status_code=404, detail="Service not found")
    old_inbounds = {(i.node_id, i.protocol, i.tag) for i in dbservice.inbounds}
    try:
        response = crud.update_service(db, dbservice, modification)
    except sqlalchemy.exc.IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409, detail="problem updating the service"
        )
    else:
        for user in response.users:
            if user.activated:
                marznode.operations.update_user(
                    user, old_inbounds=old_inbounds
                )
        return response


@router.delete("/{id}")
def remove_service(id: int, db: DBDep, admin: SudoAdminDep):
    dbservice = crud.get_service(db, id)
    if not dbservice:
        raise HTTPException(status_code=404, detail="Service not found")

    crud.remove_service(db, dbservice)
    return dict()

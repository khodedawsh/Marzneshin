from typing import Dict, List, Union

from fastapi import APIRouter

from app import __version__
# from .. import __version__
from app.db import crud
from app.dependencies import DBDep, AdminDep, SudoAdminDep
from app.models.admin import Admin
from app.models.proxy import InboundHost, Inbound
from app.models.system import SystemStats
from app.models.user import UserStatus
from app.utils.system import memory_usage, cpu_usage, realtime_bandwidth

router = APIRouter(tags=["System"])


@router.get("/system", response_model=SystemStats)
def get_system_stats(db: DBDep, admin: AdminDep):
    mem = memory_usage()
    cpu = cpu_usage()
    system = crud.get_system_usage(db)
    dbadmin: Union[Admin, None] = crud.get_admin(db, admin.username)

    total_user = crud.get_users_count(db, admin=dbadmin if not admin.is_sudo else None)
    users_active = crud.get_users_count(db, status=UserStatus.active, admin=dbadmin if not admin.is_sudo else None)
    realtime_bandwidth_stats = realtime_bandwidth()

    return SystemStats(
        version=__version__,
        mem_total=mem.total,
        mem_used=mem.used,
        cpu_cores=cpu.cores,
        cpu_usage=cpu.percent,
        total_user=total_user,
        users_active=users_active,
        incoming_bandwidth=system.uplink,
        outgoing_bandwidth=system.downlink,
        incoming_bandwidth_speed=realtime_bandwidth_stats.incoming_bytes,
        outgoing_bandwidth_speed=realtime_bandwidth_stats.outgoing_bytes,
    )


@router.get("/hosts", response_model=Dict[int, List[InboundHost]])
def get_hosts(db: DBDep, admin: SudoAdminDep):
    hosts = crud.get_all_hosts(db)

    return hosts


@router.put('/api/hosts', response_model=Dict[str, List[InboundHost]])
def modify_hosts(modified_hosts: Dict[str, List[InboundHost]],
                 db: DBDep,
                 admin: SudoAdminDep):
    # validate
    # for inbound_id, hosts in modified_hosts.items():
    #     if not xray.config.inbounds_by_id.get(inbound_id):
    #         raise HTTPException(status_code=400, detail=f"Inbound {inbound_id} doesn't exist")

    for inbound_id, hosts in modified_hosts.items():
        crud.update_hosts(db, inbound_id, hosts)

    # xray.hosts.update()

    hosts = {}
    # for inbound_tag in xray.config.inbounds_by_tag:
    #     hosts[inbound_tag] = crud.get_hosts(db, inbound_tag)

    return hosts

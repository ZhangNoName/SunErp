from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List
from src.type.import_type import ImportCreate, ImportUpdate, ImportDetailCreate, ImportDetailUpdate
from src.controller.import_manage import ImportManager
from app_instance import app

# 创建入库 API 路由
router = APIRouter(prefix="/import", tags=["入库管理"])

def get_import_manager() -> ImportManager:
    """
    获取 ImportManager 实例的依赖项

    Returns:
        ImportManager: 入库管理实例
    """
    if not hasattr(app, 'import_item'):
        raise HTTPException(status_code=500, detail="Import manager not initialized")
    return app.import_item


# 创建入库订单接口
@router.post("/", response_model=dict)
async def create_import(import_data: ImportCreate, import_manager: ImportManager = Depends(get_import_manager)):
    """
    创建新的入库订单

    Args:
        import_data (ImportCreate): 入库订单创建数据

    Returns:
        dict: 创建成功后的响应信息
    """
    try:
        import_id = import_manager.add_import(import_data)
        return {"code": 0, "data": {"import_id": import_id}, "message": "入库订单创建成功"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# 更新入库订单接口
@router.patch("/{import_id}", response_model=dict)
async def update_import(import_id: int, updates: ImportUpdate, import_manager: ImportManager = Depends(get_import_manager)):
    """
    更新指定的入库订单

    Args:
        import_id (int): 入库订单ID
        updates (ImportUpdate): 更新的入库订单数据

    Returns:
        dict: 更新成功后的响应信息
    """
    try:
        import_manager.update_import(import_id, updates)
        return {"code": 0, "data": {}, "message": "入库订单更新成功"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# 获取指定入库订单的接口
@router.get("/{import_id}", response_model=dict)
async def get_import(import_id: int, import_manager: ImportManager = Depends(get_import_manager)):
    """
    获取指定的入库订单详情

    Args:
        import_id (int): 入库订单ID

    Returns:
        dict: 包含入库订单详细信息的响应
    """
    import_data = import_manager.get_import(import_id)
    if not import_data:
        raise HTTPException(status_code=404, detail="入库订单不存在")
    return {"code": 0, "data": import_data, "message": "查询成功"}


# 获取所有入库订单接口（可以查询被删除的订单）
@router.get("/", response_model=dict)
async def list_imports(
    include_deleted: bool = Query(False, description="是否包含已删除的入库订单"),
    import_manager: ImportManager = Depends(get_import_manager)
):
    """
    查询所有入库订单，可以选择是否包含已删除的订单

    Args:
        include_deleted (bool): 是否查询已删除的入库订单（默认查询未删除的）
    
    Returns:
        dict: 入库订单列表的响应信息
    """
    imports = import_manager.list_imports(include_deleted)
    return {"code": 0, "data": imports, "message": "查询成功"}


# 软删除入库订单接口
@router.delete("/{import_id}", response_model=dict)
async def delete_import(import_id: int, import_manager: ImportManager = Depends(get_import_manager)):
    """
    软删除指定的入库订单

    Args:
        import_id (int): 入库订单ID

    Returns:
        dict: 删除成功后的响应信息
    """
    try:
        import_manager.delete_import(import_id)
        return {"code": 0, "data": {}, "message": "入库订单删除成功"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# 添加入库明细接口
@router.post("/detail", response_model=dict)
async def add_import_detail(import_detail: ImportDetailCreate, import_manager: ImportManager = Depends(get_import_manager)):
    """
    添加入库明细到指定入库单

    Args:
        import_detail (ImportDetailCreate): 入库明细数据

    Returns:
        dict: 明细添加成功后的响应信息
    """
    try:
        import_manager.add_import_detail(import_detail)
        return {"code": 0, "data": {}, "message": "入库明细添加成功"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# 更新入库明细接口
@router.patch("/detail/{import_detail_id}", response_model=dict)
async def update_import_detail(
    import_detail_id: int, 
    updates: ImportDetailUpdate, 
    import_manager: ImportManager = Depends(get_import_manager)
):
    """
    更新指定的入库明细

    Args:
        import_detail_id (int): 入库明细ID
        updates (ImportDetailUpdate): 更新的入库明细数据

    Returns:
        dict: 更新成功后的响应信息
    """
    try:
        import_manager.update_import_detail(import_detail_id, updates)
        return {"code": 0, "data": {}, "message": "入库明细更新成功"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# 获取入库明细列表接口
@router.get("/detail/{import_id}", response_model=dict)
async def list_import_details(
    import_id: int, 
    import_manager: ImportManager = Depends(get_import_manager)
):
    """
    获取指定入库单的所有明细

    Args:
        import_id (int): 入库单ID

    Returns:
        dict: 包含入库明细信息的响应
    """
    import_details = import_manager.list_import_details(import_id)
    return {"code": 0, "data": import_details, "message": "查询成功"}

from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List
from app_instance import app
from src.controller.item_manage import ItemManager
from src.type.item_type import ItemCreate, ItemUpdate
from src.type.type import ResponseModel

# 创建商品 API 路由
router = APIRouter(prefix="/item", tags=["商品"])

# 注入 ItemManager 依赖
def get_item_manager() -> ItemManager:
    """
    获取 ItemManager 实例
    Returns:
        ItemManager: 商品管理实例
    Raises:
        HTTPException: 如果 ItemManager 尚未初始化
    """
    if not hasattr(app, 'item'):
        raise HTTPException(status_code=500, detail="Item manager not initialized")
    return app.item

@router.post("/", response_model=ResponseModel)
async def create_item(item: ItemCreate, item_manager: ItemManager = Depends(get_item_manager)):
    """
    创建商品
    Args:
        item (ItemCreate): 新商品信息
        item_manager (ItemManager): 商品管理实例（依赖注入）
    Returns:
        ResponseModel: 包含创建的商品ID的响应
    Raises:
        HTTPException: 如果商品数据无效或创建失败
    """
    try:
        item_id = item_manager.add_item(item)
        return ResponseModel(code=0, data={"item_id": item_id}, message="商品创建成功")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{item_id}", response_model=ResponseModel)
async def get_item(item_id: int, item_manager: ItemManager = Depends(get_item_manager)):
    """
    获取商品详情
    Args:
        item_id (int): 商品ID
        item_manager (ItemManager): 商品管理实例（依赖注入）
    Returns:
        ResponseModel: 包含商品详情的响应
    Raises:
        HTTPException: 如果商品不存在
    """
    item = item_manager.get_item(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="商品不存在")
    return ResponseModel(code=0, data=item, message="查询成功")

@router.patch("/{item_id}", response_model=ResponseModel)
async def update_item(item_id: int, updates: ItemUpdate, item_manager: ItemManager = Depends(get_item_manager)):
    """
    更新商品信息
    Args:
        item_id (int): 商品ID
        updates (ItemUpdate): 更新的商品字段
        item_manager (ItemManager): 商品管理实例（依赖注入）
    Returns:
        ResponseModel: 更新成功的响应
    """
    item_manager.update_item(item_id, updates)
    return ResponseModel(code=0, data={}, message="商品更新成功")

@router.get("/", response_model=ResponseModel)
async def list_items(
    page: int = Query(1, ge=1, description="页码"),
    page_size: int = Query(10, ge=1, le=100, description="每页数量"),
    sort_by: str = Query("create_time", description="排序字段"),
    item_manager: ItemManager = Depends(get_item_manager)
):
    """
    分页查询商品列表
    Args:
        page (int): 页码
        page_size (int): 每页数量
        sort_by (str): 排序字段
        item_manager (ItemManager): 商品管理实例（依赖注入）
    Returns:
        ResponseModel: 包含商品列表的响应
    """
    items = item_manager.query_items(sort_by, page, page_size)
    return ResponseModel(code=0, data=items, message="查询成功")

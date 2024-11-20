from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List
from app_instance import app
from src.controller.order_manage import OrderManager
from src.db.mysql.mysql_manage import MySQLManager
from src.type.order_type import OrderCreate, OrderUpdate
from src.type.type import ResponseModel

# 创建用户 API 路由
router = APIRouter(prefix="/order",tags=["订单"])

# 注入 UserManager 依赖
def get_user_manager() -> OrderManager:
    if not hasattr(app, 'user'):
        raise HTTPException(status_code=500, detail="User manager not initialized")
    return app.order

@router.post("/", response_model=ResponseModel)
async def create_order(order: OrderCreate,order_manager: OrderManager = Depends(get_user_manager)):
    try:
        order_id = order_manager.add_order(order)
        return ResponseModel(code=0, data={"order_id": order_id}, message="订单创建成功")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{order_id}", response_model=ResponseModel)
async def get_order(order_id: int,order_manager: OrderManager = Depends(get_user_manager)):
    order = order_manager.get_order_details(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="订单不存在")
    return ResponseModel(code=0, data=order, message="查询成功")

@router.patch("/{order_id}", response_model=ResponseModel)
async def update_order(order_id: int, updates: OrderUpdate,order_manager: OrderManager = Depends(get_user_manager)):
    order_manager.update_order(order_id, updates)
    return ResponseModel(code=0, data={}, message="订单更新成功")

@router.get("/", response_model=ResponseModel)
async def list_orders(
    page: int = Query(1, ge=1, description="页码"),
    page_size: int = Query(10, ge=1, le=100, description="每页数量"),
    sort_by: str = Query("created_time", description="排序字段"),
    order_manager: OrderManager = Depends(get_user_manager)
):
    orders = order_manager.query_orders(sort_by, page, page_size)
    return ResponseModel(code=0, data=orders, message="查询成功")

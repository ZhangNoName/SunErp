from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field

class OrderItem(BaseModel):
    id: int
    order_id: int
    item_id: int
    item_name: str
    count: int
    price: float

class OrderBase(BaseModel):
    order_id: Optional[int] = Field(None, description="订单ID，自增主键")
    user_id: Optional[int] = Field(None, description="用户ID，外键关联用户表")
    total_price: float = Field(..., ge=0, description="订单总金额")
    discount: float = Field(1.0, ge=0, le=1, description="折扣")
    final_price: Optional[float] = Field(None, ge=0, description="折后金额")
    payment_method: int = Field(..., ge=1, le=7, description="付款方式")
    state: int = Field(1, ge=1, le=4, description="订单状态")
    create_time: Optional[datetime] = Field(default_factory=datetime.now, description="创建时间")
    update_time: Optional[datetime] = Field(default_factory=datetime.now, description="更新时间")
    is_active: bool = Field(default=True, description="是否删除，1是保留，0是已删除")

class OrderCreate(OrderBase):
    items: List[OrderItem]

class OrderUpdate(BaseModel):
    total_price: Optional[float] = Field(None, ge=0)
    discount: Optional[float] = Field(None, ge=0, le=1)
    final_price: Optional[float] = Field(None, ge=0)
    payment_method: Optional[int] = Field(None, ge=1, le=7)
    state: Optional[int] = Field(None, ge=1, le=4)

class OrderResponse(OrderBase):
    order_id: int
    created_time: str
    updated_time: str
    items: List[OrderItem]

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Item(BaseModel):
    """
    商品模型类
    Attributes:
        id (int): 商品编号
        name (str): 商品名称
        is_combo (bool): 是否是套餐，1为套餐，0为单品
        price (float): 价格
        discount (float): 折扣
        des (Optional[str]): 商品描述
        create_time (datetime): 创建时间
        start_time (datetime): 开售时间
        end_time (Optional[datetime]): 下架时间
    """
    id: Optional[int] = Field(None, description="商品编号")
    name: str = Field(..., description="商品名称")
    is_combo: Optional[bool] = Field(False, description="是否是套餐")
    price: float = Field(..., ge=0, description="价格")
    discount: Optional[float] = Field(1, ge=0, description="折扣")
    des: Optional[str] = Field(None, description="描述")
    create_time: Optional[datetime] = Field(None, description="创建时间")
    start_time: Optional[datetime] = Field(default_factory=datetime.now, description="开售时间")
    end_time: Optional[datetime] = Field(None, description="下架时间")

class ItemCreate(BaseModel):
    name: str = Field(..., description="商品名称")
    is_combo: Optional[bool] = Field(False, description="是否是套餐")
    price: float = Field(..., ge=0, description="价格")
    discount: Optional[float] = Field(1, ge=0, description="折扣")
    des: Optional[str] = Field(None, description="描述")
    create_time: Optional[datetime] = Field(None, description="创建时间")
    start_time: Optional[datetime] = Field(default_factory=datetime.now, description="开售时间")
    end_time: Optional[datetime] = Field(None, description="下架时间")
    class Config:
        schema_extra = {
            "example": {
                "name": "小米 14 Pro",
                "description": "升级版的苹果智能手机",
                "price": 7777.0,
                "stock": 50,
                "category": "电子产品"
            }
        }
    
class ItemUpdate(BaseModel):
    name: str = Field(..., description="商品名称")
    is_combo: Optional[bool] = Field(False, description="是否是套餐")
    price: float = Field(..., ge=0, description="价格")
    discount: Optional[float] = Field(1, ge=0, description="折扣")
    des: Optional[str] = Field(None, description="描述")
    create_time: Optional[datetime] = Field(None, description="创建时间")
    start_time: Optional[datetime] = Field(default_factory=datetime.now, description="开售时间")
    end_time: Optional[datetime] = Field(None, description="下架时间")

    class Config:
        schema_extra = {
            "example": {
                "name": "iPhone 14 Pro",
                "description": "升级版的苹果智能手机",
                "price": 8999.0,
                "stock": 50,
                "category": "电子产品"
            }
        }



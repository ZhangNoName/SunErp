from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# 入库订单创建类型
class ImportCreate(BaseModel):
    supplier_id: Optional[int] = None  # 供应商ID，可为空
    item_id: int  # 商品ID
    price: float  # 价格
    note: Optional[str] = None  # 备注
    pay_id: str  # 支付订单ID
    pay_method: int  # 付款方式
    time: datetime  # 时间

    class Config:
        schema_extra = {
            "example": {
                "supplier_id": 1,
                "item_id": 101,
                "price": 199.99,
                "time": "2024-01-01T12:00:00",
                "pay_id": "pay123456",
                "pay_method": 1,
                "note": "首次入库"
            }
        }

# 入库订单更新类型
class ImportUpdate(BaseModel):
    supplier_id: Optional[int] = None  # 可为空，供应商ID
    item_id: Optional[int] = None  # 可为空，商品ID
    price: Optional[float] = None  # 可为空，价格
    note: Optional[str] = None  # 可为空，备注
    pay_method: Optional[int] = None  # 可为空，付款方式
    time: Optional[datetime] = None  # 可为空，时间

# 入库明细创建类型
class ImportDetailCreate(BaseModel):
    import_id: int  # 外键，关联到入库单
    item_id: int  # 商品ID
    count: int  # 进货数量
    price: float  # 单价
    pay_mount: float  # 支付金额

    class Config:
        schema_extra = {
            "example": {
                "import_id": 1,
                "item_id": 101,
                "count": 10,
                "price": 199.99,
                "pay_mount": 1999.90
            }
        }

# 入库明细更新类型
class ImportDetailUpdate(BaseModel):
    count: Optional[int] = None  # 可为空，进货数量
    price: Optional[float] = None  # 可为空，单价
    pay_mount: Optional[float] = None  # 可为空，支付金额

from datetime import datetime, date
from typing import Optional
from pydantic import BaseModel, Field
import uuid

class Order(BaseModel):
    id: Optional[int] = Field(None, description="订单的唯一标识符，自增主键")
    user_name: str = Field(..., description="登录用户名")
    pay: float = Field(..., description="年龄")
    pay_mehtod: str = Field(..., description="付款方式")
    create_time: Optional[datetime] = Field(default_factory=datetime.now, description="创建时间")

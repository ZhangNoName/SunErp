from datetime import datetime, date
from typing import Optional
from pydantic import BaseModel, Field, validator
import uuid

class User(BaseModel):
    id: Optional[int] = Field(None, description="用户的唯一标识符，自增主键")
    user_name: str = Field(..., description="登录用户名")
    name: str = Field(..., description="昵称")
    age: int = Field(..., description="年龄")
    phone: str = Field(..., description="手机号")
    email: str = Field(..., description="邮箱")
    passwd: str = Field(..., description="密码")
    birth_day: date = Field(..., description="出生日期，格式为 YYYY-MM-DD")
    create_time: Optional[datetime] = Field(default_factory=datetime.now, description="创建时间")
    is_active: bool = Field(default=True, description="用户是否启用，默认启用")

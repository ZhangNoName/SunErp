import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from loguru import logger
from pydantic import BaseModel
from src.controller.user_manage import UserManager
from app_instance import app
from src.type.user_type import User
from src.type.type import ResponseModel


# 创建用户 API 路由
router = APIRouter(prefix="/user",tags=["user"])

# 注入 UserManager 依赖
def get_user_manager() -> UserManager:
    if not hasattr(app, 'user'):
        raise HTTPException(status_code=500, detail="User manager not initialized")
    return app.user

# 创建新用户
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user(user: User, user_manager: UserManager = Depends(get_user_manager)):
    """
    创建新的用户

    Args:
        user (User): 新用户的数据模型

    Returns:
        dict: 包含新用户 ID 的字典
    """
    logger.info(f'接收到的参数：{user}')
    
    res = user_manager.create_user(user)
    logger.success(f'创建结果{res}')
    if res:
        return ResponseModel(code=1, data={"id": user.id}, message="创建成功")
    else:
        return ResponseModel(code=0, data=None, message="创建失败")

# 根据id获取指定用户
@router.get("/{user_id}")
async def get_user(user_id: str, user_manager: UserManager = Depends(get_user_manager)):
    """
    获取指定 ID 的用户

    Args:
        user_id (str): 用户的 ID

    Returns:
        User: 用户对象，如果不存在则抛出 404 错误
    """
    user = user_manager.get_user_by_id(user_id)
    logger.info(f'查找的结果-----{user}')
    
    if not user:
        return ResponseModel(code=0, data=None, message="用户不存在")

    # user_dict = {item[0]: item[1] for item in user}

    return ResponseModel(code=1, data=user, message="获取成功")

# 分页获取用户
@router.get("/")
async def get_users_paginated(
    page: int = 1,
    page_size: int = 10,
    user_manager: UserManager = Depends(get_user_manager)
):
    """
    分页获取用户列表

    Args:
        page (int, optional): 页码. Defaults to 1.
        page_size (int, optional): 每页显示数量. Defaults to 10.
        user_manager (UserManager, optional): 用户管理对象. Defaults to Depends(get_user_manager).

    Returns:
        dict: 包含分页信息的字典
    """

    users = user_manager.get_user_by_name('',page, page_size)
    return ResponseModel(code=1, data=users, message="获取成功")


# 删除指定用户
@router.delete("/{user_id}")
async def delete_user(user_id: str, user_manager: UserManager = Depends(get_user_manager)):
    """
    停用指定 ID 的用户

    Args:
        user_id (str): 用户的 ID

    Returns:
        dict: 包含停用成功消息的字典
    """
    res = user_manager.delete_user(user_id)
    # logger.info(f'停用用户的结果:{res}')
    if not res:
        return ResponseModel(code=0, data=False, message="用户不存在")
    return ResponseModel(code=1, data=True, message="停用成功")

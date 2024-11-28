from datetime import datetime
from typing import Optional
from loguru import logger
from src.db.mysql.mysql_manage import MySQLManager
from src.type.user_type import User

class UserManager:
    table_name = "user"
    all_attr = ['id', 'user_name', 'name', 'age', 'phone', 'email', 'passwd', 'birth_day', 'create_time', 'is_active']
    
    def __init__(self, db:MySQLManager):
        self.db = db

    def get_all_user_attr(self) -> str:
        """
        获取全部的用户名字段的字符串
        
        Returns:
            属性字符串，以逗号分隔
        """
        return ",".join(self.all_attr)
    def create_user(self, user:User):
        """
        创建用户

        Args:
            name (str): 用户名
            age (int): 年龄
            phone (str): 手机号码
            email (str): 邮箱
            passwd (str): 密码
            birth_day (str): 生日，格式为YYYY-MM-DD
        """
        sql = f"INSERT INTO {self.table_name} (user_name, name, age, phone, email, passwd, birth_day, create_time) VALUES (%s,%s,%s, %s, %s, %s, %s,  NOW())"
        val = (user.user_name,user.name, user.age, user.phone, user.email, user.passwd, user.birth_day)
        try:
            # self.db.execute(sql, [val])
            # 连接数据库（假设已建立连接）
            # res = self.db.execute(sql,val)
            cursor = self.db.cursor
            cursor.execute(sql, val)
            # 获取插入行的 ID
            user_id = cursor.lastrowid
            logger.info(f"用户创建成功{user_id}")
            return user_id
        except Exception as e:
            logger.error(f"Error occurred: {e}")
            return False


    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """
        根据用户ID查询用户信息

        Args:
            user_id (int): 用户ID

        Returns:
            User: User对象，如果不存在则返回None
        """
        sql = f"SELECT {self.get_all_user_attr()} FROM {self.table_name} WHERE id = %s"
        result = self.db.fetch_one(sql, user_id)
        logger.info(f"根据id查询的结果{result}")
        
        # 查询结果是字典形式
        if isinstance(result, dict):
            user_data = result
        else:
            # 如果是元组形式，手动构造字典
            user_data = dict(zip(self.all_attr, result))
        return user_data
    def get_user_by_name(self, name: str, page: int = 1, per_page: int = 10) -> list[User]:
        """
        根据用户名模糊查询用户信息，支持分页

        Args:
            name (str): 用户名
            page (int): 页码，从1开始，默认为1
            per_page (int): 每页显示的记录数量，默认为10

        Returns:
            list[User]: 查询到的用户列表
        """
        offset = (page - 1) * per_page
        sql = f"""
        SELECT {self.get_all_user_attr()} 
        FROM {self.table_name} 
        WHERE name LIKE %s 
        ORDER BY id ASC 
        LIMIT %s OFFSET %s
        """
        # 将参数打包为一个元组
        params = (f"%{name}%", per_page, offset)

        # 传递参数时使用元组
        result = self.db.execute(sql, params)

        # 将查询结果转换为User对象列表
        users = [User(**dict(zip(self.all_attr, row))) for row in result]
        return users


    # 其他查询方法，如根据name、phone查询，类似于get_user_by_id

    def update_user(self, user_id: str, **kwargs) -> int:
        """
        更新用户信息

        Args:
            user_id (str): 用户ID
            kwargs: 要更新的字段和值，例如：name='new_name', age=30

        Returns:
            int: 受影响的行数
        """
        # 构造更新语句
        set_clause = ', '.join(f"{key} = %s" for key in kwargs)
        sql = f"UPDATE {self.table_name} SET {set_clause} WHERE id = %s"
        # 构造参数
        values = tuple(kwargs.values()) + (user_id,)
        # 执行SQL并返回受影响的行数
        return self.db.execute(sql, values)


    def delete_user(self, user_id: str) -> bool:
        """
        逻辑删除用户（停用账号）

        Args:
            user_id (str): 用户ID

        Returns:
            bool: 修改成功返回True，否则返回False
        """
        # 调用 update_user 方法更新 is_active 字段为 0
        result = self.update_user(user_id, is_active=0)
        # logger.info(f'更改的信息结果：{result}')
        # 判断受影响的行数，update_user 默认返回受影响的行数
        return result > 0

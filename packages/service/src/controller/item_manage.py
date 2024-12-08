from typing import Any, Dict, List, Optional
from src.db.mysql.mysql_manage import MySQLManager
from src.type.item_type import Item


class ItemManager:
    """
    商品管理类
    Methods:
        add_item(item: Item) -> int: 添加商品
        update_item(item: Item) -> bool: 更新商品信息
        delete_item(item_id: int) -> bool: 删除商品
        get_item(item_id: int) -> Optional[Item]: 获取商品信息
        get_all_items() -> list[Item]: 获取所有商品信息
    """
    table_name = "item"
    all_attr = ['id', 'name', 'is_combo', 'price', 'discount', 'des', 'create_time', 'start_time', 'end_time']

    def __init__(self, db:MySQLManager):
        """
        初始化商品管理类
        Args:
            db (MySQLManager): 数据库管理类实例
        """
        self.db = db
    def get_all_item_attr(self) -> str:
        """
        获取全部的字段的字符串
        
        Returns:
            属性字符串，以逗号分隔
        """
        return ",".join(self.all_attr)

    def add_item(self, item: Item) -> int:
        """
        添加商品
        Args:
            item (Item): 商品对象
        Returns:
            int: 新增商品的ID
        """
        sql = f"""
        INSERT INTO {self.table_name} 
        (name, is_combo, price, discount, des, create_time, start_time, end_time)
        VALUES (%s, %s, %s, %s, %s, NOW(), %s, %s)
        """
        values = (item.name, item.is_combo, item.price, item.discount, item.des, item.start_time, item.end_time)
        return self.db.execute(sql, values)

    def update_item(self, item: Item) -> bool:
        """
        更新商品信息
        Args:
            item (Item): 商品对象
        Returns:
            bool: 是否更新成功
        """
        sql = f"""
        UPDATE {self.table_name} 
        SET name=%s, is_combo=%s, price=%s, discount=%s, des=%s, start_time=%s, end_time=%s
        WHERE id=%s
        """
        values = (item.name, item.is_combo, item.price, item.discount, item.des, item.start_time, item.end_time, item.id)
        return self.db.execute(sql, values) > 0

    def delete_item(self, item_id: int) -> bool:
        """
        删除商品
        Args:
            item_id (int): 商品ID
        Returns:
            bool: 是否删除成功
        """
        sql = f"DELETE FROM {self.table_name} WHERE id=%s"
        return self.db.execute(sql, (item_id,)) > 0

    def get_item(self, item_id: int) -> Optional[Item]:
        """
        获取商品信息
        Args:
            item_id (int): 商品ID
        Returns:
            Optional[Item]: 商品对象或None
        """
        sql = f"SELECT {self.get_all_item_attr()} FROM {self.table_name} WHERE id=%s"
        result = self.db.fetch_one(sql, (item_id,))
        
        # 检查是否查询到结果
        if not result:
            return None

        # 查询结果是字典形式
        if isinstance(result, dict):
            item_data = result
        else:
            # 如果是元组形式，手动构造字典
            item_data = dict(zip(self.all_attr, result))
        
        # 转换为 Item 对象并返回
        return Item(**item_data)


    def get_all_items(self) -> list[Item]:
        """
        获取所有商品信息
        Returns:
            list[Item]: 商品对象列表
        """
        sql = f"SELECT {self.get_all_item_attr()} FROM {self.table_name}"
        rows = self.db.execute(sql)
        return [Item(**row) for row in rows]

    def query_items(self, sort_by: str, page: int, page_size: int) -> List[Dict[str, Any]]:
        """
        按字段排序分页查询订单
        """
        offset = (page - 1) * page_size
        sql = f"""
        SELECT * FROM {self.table_name}
        ORDER BY {sort_by}
        LIMIT %s OFFSET %s
        """
        items =  self.db.execute(sql, (page_size, offset))
        return [Item(**dict(zip(self.all_attr, row))) for row in items]
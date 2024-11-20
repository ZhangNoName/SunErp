from typing import Any, List, Optional, Dict
from pymysql import IntegrityError

from src.db.mysql.mysql_manage import MySQLManager
from src.type.order_type import OrderCreate, OrderItem, OrderUpdate

class OrderManager:
    all_attr = ['order_id', 'user_id', 'total_price', 'discount', 'final_price', 'payment_method', 'created_time', 'updated_time', 'state', 'is_active']
    all_item_attr = ["id","order_id","item_id","item_name","count","price"]
    def __init__(self, db: MySQLManager):
        self.db = db
        
    def get_all_order_attr(self) -> str:
        """
        获取全部的用户名字段的字符串
        
        Returns:
            属性字符串，以逗号分隔
        """
        return ",".join(self.all_attr)
    def get_all_order_item_attr(self) -> str:
        """
        获取全部的用户名字段的字符串
        
        Returns:
            属性字符串，以逗号分隔
        """
        return ",".join(self.all_item_attr)

    def add_order(self, order: OrderCreate) -> int:
        """
        添加订单及其物品内容
        """
        order_sql = """
        INSERT INTO orders (user_id, total_price, discount, final_price, payment_method, state)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        order_params = (
            order.user_id,
            order.total_price,
            order.discount,
            order.final_price,
            order.payment_method,
            order.state,
        )
        try:
            self.db.execute(order_sql, order_params)
            order_id = self.db.cursor.lastrowid
            for item in order.items:
                item_sql = """
                INSERT INTO order_items (order_id, item_id, item_name, count, price)
                VALUES (%s, %s, %s, %s, %s)
                """
                item_params = (order_id, item.item_id, item.item_name, item.count, item.price)
                self.db.execute(item_sql, item_params)
            return order_id
        except IntegrityError as e:
            raise ValueError(f"添加订单失败，可能原因：{e}")

    def get_order_details(self, order_id: int) -> Optional[Dict[str, Any]]:
        """
        根据订单ID查询详情及物品数目
        """
        order_sql = f"SELECT {self.get_all_order_attr()} FROM orders WHERE order_id = %s"
        items_sql = f"SELECT {self.get_all_order_item_attr()} FROM order_items WHERE order_id = %s"
        order_row = self.db.fetch_one(order_sql, (order_id,))
        items = self.db.execute(items_sql, (order_id,))
        
        if order_row:
            # 将 tuple 转为 dict
            order = dict(zip(self.all_attr, order_row))
            # 将 items 转为对象列表
            order["items"] = [OrderItem(**dict(zip(self.all_item_attr, row))) for row in items]
            return order
        
        return None


    def update_order(self, order_id: int, updates: OrderUpdate):
        """
        更新订单的部分属性
        """
        fields = []
        values = []
        for key, value in updates.dict(exclude_unset=True).items():
            fields.append(f"{key} = %s")
            values.append(value)
        sql = f"UPDATE orders SET {', '.join(fields)} WHERE order_id = %s"
        values.append(order_id)
        self.db.execute(sql, tuple(values))

    def query_orders(self, sort_by: str, page: int, page_size: int) -> List[Dict[str, Any]]:
        """
        按字段排序分页查询订单
        """
        offset = (page - 1) * page_size
        sql = f"""
        SELECT * FROM orders
        ORDER BY {sort_by}
        LIMIT %s OFFSET %s
        """
        return self.db.execute(sql, (page_size, offset))

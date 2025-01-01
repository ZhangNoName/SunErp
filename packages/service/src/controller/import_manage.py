from typing import List, Optional
from src.db.mysql.mysql_manage import MySQLManager
from src.type.import_type import ImportCreate, ImportUpdate, ImportDetailCreate, ImportDetailUpdate

class ImportManager:
    def __init__(self, db: MySQLManager):
        self.db = db
        self.table_name = "import"
        self.detail_table_name = "import_detail"

    # 获取入库单的所有属性
    def get_all_import_attr(self) -> str:
        return "id, supplier_id, item_id, price, time, note, pay_id, pay_method"

    # 获取入库明细的所有属性
    def get_all_import_detail_attr(self) -> str:
        return "id, import_id, item_id, count, price, pay_mount"

    def add_import(self, import_data: ImportCreate) -> int:
        """
        添加新的入库订单
        """
        sql = f"""
        INSERT INTO {self.table_name} (supplier_id, item_id, price, time, note, pay_id, pay_method)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        return self.db.insert(sql, (
            import_data.supplier_id, 
            import_data.item_id, 
            import_data.price, 
            import_data.time, 
            import_data.note, 
            import_data.pay_id, 
            import_data.pay_method
        ))

    def update_import(self, import_id: int, updates: ImportUpdate):
        """
        更新入库订单
        """
        sql = f"UPDATE {self.table_name} SET "
        params = []
        if updates.supplier_id is not None:
            sql += "supplier_id = %s, "
            params.append(updates.supplier_id)
        if updates.item_id is not None:
            sql += "item_id = %s, "
            params.append(updates.item_id)
        if updates.price is not None:
            sql += "price = %s, "
            params.append(updates.price)
        if updates.note is not None:
            sql += "note = %s, "
            params.append(updates.note)
        if updates.pay_method is not None:
            sql += "pay_method = %s, "
            params.append(updates.pay_method)
        if updates.time is not None:
            sql += "time = %s, "
            params.append(updates.time)
        
        sql = sql.rstrip(', ') + f" WHERE id = %s"
        params.append(import_id)
        self.db.execute(sql, tuple(params))

    def get_import(self, import_id: int) -> Optional[dict]:
        """
        获取指定入库单信息
        """
        sql = f"SELECT {self.get_all_import_attr()} FROM {self.table_name} WHERE id = %s"
        return self.db.fetch_one(sql, (import_id,))

    def list_imports(self, include_deleted: bool = False) -> List[dict]:
        """
        获取所有入库单，默认不包含已删除的
        """
        sql = f"SELECT {self.get_all_import_attr()} FROM {self.table_name} WHERE is_deleted = %s"
        return self.db.fetch_all(sql, (include_deleted,))

    def delete_import(self, import_id: int):
        """
        删除（软删除）入库单
        """
        sql = f"UPDATE {self.table_name} SET is_deleted = 1 WHERE id = %s"
        self.db.execute(sql, (import_id,))

    def add_import_detail(self, import_detail: ImportDetailCreate):
        """
        添加入库明细
        """
        sql = f"""
        INSERT INTO {self.detail_table_name} (import_id, item_id, count, price, pay_mount)
        VALUES (%s, %s, %s, %s, %s)
        """
        self.db.execute(sql, (
            import_detail.import_id, 
            import_detail.item_id, 
            import_detail.count, 
            import_detail.price, 
            import_detail.pay_mount
        ))

    def update_import_detail(self, import_detail_id: int, updates: ImportDetailUpdate):
        """
        更新入库明细
        """
        sql = f"UPDATE {self.detail_table_name} SET "
        params = []
        if updates.count is not None:
            sql += "count = %s, "
            params.append(updates.count)
        if updates.price is not None:
            sql += "price = %s, "
            params.append(updates.price)
        if updates.pay_mount is not None:
            sql += "pay_mount = %s, "
            params.append(updates.pay_mount)
        
        sql = sql.rstrip(', ') + f" WHERE id = %s"
        params.append(import_detail_id)
        self.db.execute(sql, tuple(params))

    def list_import_details(self, import_id: int) -> List[dict]:
        """
        获取指定入库单的所有明细
        """
        sql = f"SELECT {self.get_all_import_detail_attr()} FROM {self.detail_table_name} WHERE import_id = %s"
        return self.db.fetch_all(sql, (import_id,))

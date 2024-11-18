from loguru import logger
import pymysql
import time
from typing import Any, Optional, Tuple

class MySQLManager:
    """
    MySQL连接管理类，基于PyMySQL库实现。

    该类提供了一个健壮的MySQL连接，支持自动重连、上下文管理、异常处理等功能。

    属性:
        host (str): MySQL服务器主机名
        port (int): MySQL服务器端口
        user (str): MySQL用户名
        passwd (str): MySQL密码
        db (str): MySQL数据库名
        charset (str): 字符集，默认为utf8mb4
        max_retry_times (int): 最大重试次数，默认为3
        retry_interval (int): 重试间隔时间（秒），默认为5
    """

    def __init__(self, host: str, port: int, db: str, user: Optional[str] = None,
                 passwd: Optional[str] = None, charset: str = 'utf8mb4',
                 max_retry_times: int = 3, retry_interval: int = 5):
        self.host = host
        self.port = port
        self.user = user
        self.passwd = passwd
        self.db = db
        self.charset = charset
        self.max_retry_times = max_retry_times
        self.retry_interval = retry_interval
        self.cnx = None
        self.cursor = None
        self.connect()

    def connect(self):
        """建立数据库连接"""
        try:
            self.cnx = pymysql.connect(
                host=self.host,
                port=self.port,
                user=self.user,
                passwd=self.passwd,
                db=self.db,
                charset=self.charset,
                autocommit=False  # 禁止自动提交，使用手动提交
            )
            self.cursor = self.cnx.cursor()
            logger.info("成功连接到MySQL数据库")
        except pymysql.Error as e:
            logger.error(f"连接MySQL数据库失败: {e}")
            raise

    def is_alive(self) -> bool:
        """检查连接是否存活"""
        try:
            if self.cnx and self.cursor:
                self.cursor.execute("SELECT 1")
                return True
        except pymysql.Error as e:
            logger.error(f"数据库连接检查失败: {e}")
        return False

    def reconnect(self):
        """重试连接数据库"""
        for attempt in range(1, self.max_retry_times + 1):
            logger.warning(f"尝试重新连接数据库, 第 {attempt} 次...")
            self.connect()
            if self.is_alive():
                logger.info("重连MySQL数据库成功")
                return
            time.sleep(self.retry_interval)
        logger.error(f"重试 {self.max_retry_times} 次后仍无法连接MySQL数据库")
        raise ConnectionError("无法连接到MySQL数据库")

    def execute(self, sql: str, params: Optional[Tuple[Any, ...]] = None) -> Optional[int]:
        """
        执行SQL语句，支持参数化查询

        Args:
            sql (str): 要执行的SQL语句
            params (tuple): SQL语句的参数

        Returns:
            Optional[int]: 返回受影响的行数，或查询结果的第一行
        """
        if not self.is_alive():
            self.reconnect()

        try:
            logger.info(f"执行SQL: {sql} | 参数: {params}")
            self.cursor.execute(sql, params)
            self.cnx.commit()
            if sql.strip().lower().startswith("select"):
                result = self.cursor.fetchall()
                logger.info(f"查询结果: {result}")
                return result
            return self.cursor.rowcount
        except pymysql.Error as e:
            self.cnx.rollback()
            logger.error(f"SQL执行失败: {e}")
            raise
    def fetch_one(self, sql: str, params: Tuple[Any, ...] = ()) -> Optional[dict]:
        """
        查询一条记录

        Args:
            sql (str): 要执行的SQL语句
            params (tuple): 参数

        Returns:
            Optional[dict]: 查询结果的字典，如果没有数据则返回None
        """
        if not self.is_alive():
            self.reconnect()
        try:
            self.cursor.execute(sql, params)
            result = self.cursor.fetchone()
            logger.info(f"查询一条记录: {sql} | 参数: {params} | 结果: {result}")
            return result
        except pymysql.Error as e:
            logger.error(f"查询失败: {e}")
            return None

    def close(self):
        """关闭数据库连接"""
        if self.cursor:
            self.cursor.close()
        if self.cnx:
            self.cnx.close()
        logger.info("关闭MySQL数据库连接")

    def __enter__(self):
        """支持上下文管理"""
        if not self.is_alive():
            self.reconnect()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """退出时关闭连接"""
        self.close()

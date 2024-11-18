from typing import Any, Dict

from redis import Redis
from loguru import logger

SECONDS_IN_ONE_MINUTE = 60
SECONDS_IN_FIVE_MINUTES = 300
SECONDS_IN_TEN_MINUTES = 600
SECONDS_IN_ONE_HOUR = 3600
SECONDS_IN_ONE_DAY = 86400
SECONDS_IN_ONE_MONTH = 2592000


class RedisManager():
    """Redis 单点服务"""
    logger = logger

    def __init__(
        self,
        auth: str,
        ip: str,
        port: int,
        db:int,
        key_prefix: str,
        timeout: float = 1.0,
        **kwargs
    ):
        """
        @param auth: 授权密码
        @param ip: Redis 服务器 IP
        @param port: Redis 服务器端口
        @param db: Redis 数据库编号
        @param key_prefix: 数据 key 前缀
        @param timeout: 超时时间，单位：秒
        """
        super().__init__()

        self.auth = auth
        self.key_prefix = key_prefix
        self.timeout = timeout

        self.redis_node = {
            "host": ip,
            "port": port,
            "db": db
        }

        self.connect()
        self.ping()

    def __repr__(self) -> str:
        return "redis single node {}:{} db:{}".format(
            self.redis_node["host"], self.redis_node["port"], self.redis_node["db"]
        )

    def connect(self) -> bool:
        try:
            self.r = Redis(
                host=self.redis_node["host"],
                port=self.redis_node["port"],
                db=self.redis_node['db'],
                decode_responses=True,
                password=self.auth,
                socket_connect_timeout=self.timeout,
            )
        except Exception as ex:
            self.r = None

            self.logger.error("failed to connect {}: {}".format(self, ex))
            return False
        else:
            self.logger.debug(" {} connected success".format(self))
            return True

    def _maybe_reconnect(self):
        if self.r is None and not self.connect():
            raise Exception()

    def ping(self) -> bool:
        """ping/探活"""
        try:
            self._maybe_reconnect()

            return self.r.ping()
        except:
            return False

    def _get_redis_key(self, name: str, prefix: str = None):
        """
        转换 redis key 修饰器
        @param name: key
        @param prefix: 自定义前缀
        """
        if prefix:  # 自定义前缀
            keyname = "{}:{}".format(prefix, name)
        elif self.key_prefix:
            keyname = "{}:{}".format(self.key_prefix, name)
        else:
            keyname = name

        return keyname
    
    def hset(
        self,
        name: str,
        key: str,
        value: Any,
        ttl: int = SECONDS_IN_ONE_MONTH,
        prefix: str = None,
    ) -> int:
        """
        redis hset
        @param name: name
        @param key: key
        @param value: value
        @param ttl: 失效时间，单位：秒
        @param prefix: 自定义前缀
        @return int
        """
        self._maybe_reconnect()
        redis_key = self._get_redis_key(name, prefix)

        rtn = self.r.hset(redis_key, key, value)
        if ttl is not None and ttl > 0:
            self.r.expire(redis_key, ttl)

        return rtn

    def hget(self, name: str, key: str, prefix: str = None) -> Any:
        """
        redis hget
        @param name: name
        @param key: key
        @param prefix: 自定义前缀
        @return value
        """
        self._maybe_reconnect()
        redis_key = self._get_redis_key(name, prefix)

        return self.r.hget(redis_key, key)

    def hgetall(self, name: str, prefix: str = None) -> Dict:
        """
        hget
        @param name: redis key
        @param prefix: 自定义前缀
        @return hash key/value 词典
        """
        self._maybe_reconnect()
        redis_key = self._get_redis_key(name, prefix)

        return self.r.hgetall(redis_key)

    def expire(self, name: str, ttl: int, prefix: str = None) -> bool:
        """
        set expire time
        @param name: redis key
        @param ttl: timeout
        @param prefix: 自定义前缀
        """
        self._maybe_reconnect()
        redis_key = self._get_redis_key(name, prefix)

        return self.r.expire(redis_key, ttl)

    def hincrby(self, name: str, key: str, value: int, prefix: str = None) -> int:
        """
        hincrby
        @param name: redis key
        @param key
        @param value
        @param prefix: 自定义前缀
        @return int
        """
        self._maybe_reconnect()
        redis_key = self._get_redis_key(name, prefix)

        return self.r.hincrby(redis_key, key, value)

    def delete(self, name: str, prefix: str = None):
        """
        delete key
        @param name: redis key
        @param prefix: 自定义前缀
        @return 0/1
        """
        self._maybe_reconnect()
        redis_key = self._get_redis_key(name, prefix)

        return self.r.delete(redis_key)

    def zrange(self, name: str, prefix: str = None):
        """
        zsetget key
        @param name: redis key
        @param prefix: 自定义前缀
        @return value
        """
        self._maybe_reconnect()
        redis_key = self._get_redis_key(name, prefix)

        return self.r.zrange(redis_key, 0, -1, withscores=True)

    def lrange(self, name: str, prefix: str = None):
        """
        redis lrange key
        @param name: redis key
        @param prefix: 自定义前缀
        @return value
        """
        self._maybe_reconnect()
        redis_key = self._get_redis_key(name, prefix)
        return self.r.lrange(redis_key, 0, -1)

    def lpush(
        self, name: str, value: Any, prefix: str = None, ttl=SECONDS_IN_ONE_MONTH
    ):
        """
        redis lpush
        @param name: redis key
        @param value
        @param prefix: 自定义前缀
        @return int
        """
        self._maybe_reconnect()
        redis_key = self._get_redis_key(name, prefix)
        rtn = self.r.lpush(redis_key, value)
        if ttl is not None and ttl > 0:
            self.r.expire(redis_key, ttl)
        return rtn

    def lrem(self, name: str, value: Any, prefix: str = None):
        """
        redis lrem
        @param name: redis key
        @param value
        @param prefix: 自定义前缀
        @return int
        """
        self._maybe_reconnect()
        redis_key = self._get_redis_key(name, prefix)
        return self.r.lrem(redis_key, 0, value)
    
    def scan(self,pattern:str,max_count=100):
        """
        redis scan
        @param pattern: redis pattern
        @param max_count: 最大数目
        @return int
        """
        cursor = '0'
        self._maybe_reconnect()
        res = {}
        while cursor != 0:
            cursor, keys =self.r.scan(cursor, match=pattern, count=max_count)
            for key in keys:
                key_type = self.r.type(key)
                if key_type == 'string':
                    value = self.r.get(key)
                elif key_type == 'hash':
                    value = self.r.hgetall(key)
                res[key] = value
        return res
    
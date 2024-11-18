from typing import Any, Dict, List, Union
from pydantic import BaseModel

class ResponseModel(BaseModel):
    """
    统一的API接口返回数据模型

    该模型用于规范所有接口的返回格式，使得接口返回数据结构统一，便于前端解析和处理。

    属性：
        code (int): 状态码，用于表示请求的执行结果。
            * 0: 请求成功
            * 其他值: 请求失败，具体含义由业务定义
        data (any): 返回的数据，可以是任意类型，根据不同的接口返回不同的数据。
        message (str): 描述信息，用于提供更详细的错误信息或成功提示。
    """
    code: int
    data: Union[Dict[str, Any], List[Any], str, bool]
    message: str
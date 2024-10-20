import { count } from "echarts/types/src/component/dataZoom/history.js";

export type ItemStateType = "enable" | "disable" | "warning";

/**
 * 商品的属性
 */
export interface ItemProps {
  id: string;
  name: string;
  type?: string;
  image?: string;
  price: number;
  discount?: number;
  discountPrice: number;
  state?: ItemStateType;
  stock?: number;
  lastStockDate?: string;
  des?: string;
}
/**
 * 商品卡片的属性
 */
export interface ItemCardProps extends ItemProps {
  onClick?: Function;
}
export interface PromotItemTableColumnTypes {
  id: string;
  name: string;
  price: number;
  discount?: number;
  discountPrice: number;
  state?: ItemStateType;
}
export interface PromotItem {
  id: string;
  count: number;
}

export interface PromotTypes {
  id: string;
  name: string;
  state: "进行中" | "等待" | "结束";
  type: "单次" | "多次";
  startDate: string;
  endDate: string;
  items: PromotItem[];
}
export interface ComboTypes {
  id: string;
  name: string;
  state: "进行中" | "等待" | "结束";
  type: "单次" | "多次";
  startDate: string;
  endDate: string;
  items: PromotItem[];
}

export interface RecordTableColumnTypes {
  id: string;
  time: string;
  type: "堂食" | "外卖";
  state: "进行中" | "等待" | "结束";
  vip: string;
  items: any;
  totalPrice: number;
  payMethod: string;
  payState: string;
  payTime: string;
  payMoney: number;
}
export interface DeliveryInfo {
  id: string;
  name: string;
  phone: string;
  address: string;
}
export interface VipTableColumnTypes {
  id: string; //id
  name: string; //姓名
  state: "使用中" | "停用";
  level: string; //等级
  phone: string; // 手机
  address: string; // 地址
  balance: number; //余额
  totalBalance: number; //总额
  points: number; // 可用积分
  totalPoints: number; // 总积分
  createTime: string; //创建时间
  lastTime: string; //上次使用时间
  transactionCount: string; //消费笔数
  deliveryInfo?: DeliveryInfo[];
}

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
  state?: "enable" | "disable" | "warning";
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

export interface PromotTypes {
  id: string;
  name: string;
  state: "进行中" | "等待" | "结束";
  type: "单次" | "多次";
  startDate: string;
  endDate: string;
  items: [];
}

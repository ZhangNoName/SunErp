/**
 * 商品的属性
 */
export interface ItemProps {
  id: string;
  name: string;
  type?: string;
  image?: string;
  price: number;
  state?: "enable" | "disable" | "warning";
  stock?: number;
  des?: string;
}
/**
 * 商品卡片的属性
 */
export interface ItemCardProps extends ItemProps {
  onClick?: Function;
}

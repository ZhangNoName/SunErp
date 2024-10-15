export interface ItemTypes {
  label: string;
  value: string;
}

export const ItemTypesList = ["主食", "小食", "饮料", "赠品", "披萨", "套餐"];
export const ItemStateList: ItemTypes[] = [
  {
    label: "上架",
    value: "enable",
  },
  {
    label: "下架",
    value: "disable",
  },
  {
    label: "库存告警",
    value: "warning",
  },
];

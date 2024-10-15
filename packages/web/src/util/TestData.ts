export interface ItemTypes {
  label: string;
  value: string;
}
export const ItemTypesList: ItemTypes[] = [
  {
    label: "主食",
    value: "1",
  },
  {
    label: "小食",
    value: "2",
  },
  {
    label: "饮料",
    value: "3",
  },
  {
    label: "套餐",
    value: "4",
  },
  {
    label: "活动",
    value: "5",
  },
  {
    label: "披萨",
    value: "6",
  },
];
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

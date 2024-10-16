import { ItemProps } from "@/type";

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

export const PromotTypeList = ["仅一次", "每天", "自定义"];
export const ItemDataTest: ItemProps[] = [
  {
    id: "1",
    name: "经典汉堡",
    type: "主菜",
    discount: 0.9,
    image: "classic_burger.jpg",
    price: 35,
    discountPrice: 30,
    state: "enable",
    stock: 10,
    des: "美味的经典汉堡，搭配新鲜的生菜和番茄",
  },
  {
    id: "2",
    name: "芝士汉堡",
    type: "主菜",
    image: "cheese_burger.jpg",
    price: 40,
    discount: 0.9,
    discountPrice: 36,
    state: "enable",
    stock: 8,
    des: "香浓的芝士汉堡，满足您的味蕾",
  },
  {
    id: "3",
    name: "双层牛肉汉堡",
    type: "主菜",
    image: "double_beef_burger.jpg",
    price: 50,
    discount: 0.9,
    discountPrice: 45,
    state: "warning",
    stock: 3,
    des: "两倍牛肉的双层汉堡，适合肉食爱好者",
  },
  {
    id: "4",
    name: "素食汉堡",
    type: "主菜",
    image: "veggie_burger.jpg",
    price: 30,
    discount: 0.9,
    discountPrice: 25,
    state: "enable",
    stock: 5,
    des: "健康美味的素食汉堡，适合素食者",
  },
  {
    id: "5",
    name: "薯条",
    type: "配菜",
    image: "fries.jpg",
    price: 15,
    discount: 0.9,
    discountPrice: 12,
    state: "enable",
    stock: 20,
    des: "金黄酥脆的薯条，完美搭配任何汉堡",
  },
  {
    id: "6",
    name: "可乐",
    type: "饮料",
    image: "cola.jpg",
    price: 10,
    discount: 0.9,
    discountPrice: 8,
    state: "enable",
    stock: 50,
    des: "冰镇可乐，解渴又清爽",
  },
  {
    id: "7",
    name: "炸小鸡腿",
    type: "配菜",
    image: "cola.jpg",
    price: 10,
    discount: 0.9,
    discountPrice: 8,
    state: "enable",
    stock: 50,
    des: "炸鸡小腿，外酥里嫩",
  },
  {
    id: "8",
    name: "汉堡可乐套餐",
    type: "套餐",
    image: "cola.jpg",
    price: 10,
    discount: 0.9,
    discountPrice: 8,
    state: "enable",
    stock: 50,
    des: "炸鸡小腿，外酥里嫩",
  },
];

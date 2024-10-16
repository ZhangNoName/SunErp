import { ItemCardProps, ItemProps } from "@/type";
import { ItemDataTest } from "@/util/TestData";

function transformToKeyValueFormat(arr: ItemProps[]): {
  [key: string]: ItemProps;
} {
  return arr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as { [key: string]: ItemProps });
}

export const ItemMap = transformToKeyValueFormat(ItemDataTest);

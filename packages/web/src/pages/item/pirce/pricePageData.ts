import { ItemDataTest } from "@/pages/order/oerderPage.data";
import { ItemProps } from "@/type";

export interface PriceTableDataType extends ItemProps {
  key: React.Key;
}

function transformToKeyValueFormat(arr: ItemProps[]): {
  [key: string]: ItemProps;
} {
  return arr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as { [key: string]: ItemProps });
}

export const ItemMap = transformToKeyValueFormat(ItemDataTest);
export const PriceTableData: PriceTableDataType[] = ItemDataTest.map((o) => {
  return { ...o, key: o.id };
});

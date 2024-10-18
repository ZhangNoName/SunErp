import { RecordTableColumnTypes } from "@/type";

export const RecordTableData: RecordTableColumnTypes[] = [
  {
    id: "1",
    time: "2024-02-02 12:00:00",
    type: "外卖",
    state: "进行中",
    payState: "已支付",
    payMethod: "微信",
    payTime: "2024-02-02 12:00:00",
    payMoney: 100,
    totalPrice: 100,
    vip: "zxy",
    items: [
      {
        id: "1",
        name: "MenuItem1",
        price: 100,
        num: 1,
      },
      {
        id: "2",
        name: "MenuItem2",
        price: 200,
        num: 2,
      },
    ],
  },
];

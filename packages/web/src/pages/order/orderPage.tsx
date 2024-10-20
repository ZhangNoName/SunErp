import { FC, useCallback, useMemo, useState } from "react";
import "./orderPage.css";
import { ItemMap } from "./orderPage.data";
import { ItemCard } from "@/components";
import { Button, Input, InputNumber } from "antd";
import { ItemProps } from "@/type";
import { Debounce } from "@/util/functions";
import { PlusCircleFilled } from "@ant-design/icons";
import CheckedItemCard from "@/components/checkedItemCard/checkedItemCard";
import { ItemDataTest } from "@/util/TestData";

interface OrderPageProps {}

export const OrderPage: FC<OrderPageProps> = ({}) => {
  const [showItemsList, setShowItemsList] = useState<ItemProps[]>(ItemDataTest);
  const [checkedItem, setCheckedItem] = useState<{ [key: string]: number }>({});

  const addItem = (id: string) => {
    if (checkedItem[id]) {
      checkedItem[id] += 1;
    } else {
      checkedItem[id] = 1;
    }
    setCheckedItem({
      ...checkedItem,
    });
  };
  const changeItemCount = (id: string, num: number) => {
    checkedItem[id] = num;
    setCheckedItem({
      ...checkedItem,
    });
  };
  const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterContent = e.target.value;
    setShowItemsList(
      ItemDataTest.filter((item) => item.name.includes(filterContent))
    );
  };
  const debounceSearch = useCallback(Debounce(searchChange, 500), []);
  const totalPrice = useMemo(() => {
    return Object.keys(checkedItem).reduce((pre, cur) => {
      return pre + checkedItem[cur] * ItemMap[cur].discountPrice;
    }, 0);
  }, [checkedItem]);
  return (
    <div className="order-page-container page-container">
      <div className="order-pager-header">
        <Input placeholder="搜索商品" onChange={debounceSearch}></Input>
        <Button>清空</Button>
        <Button>开钱箱</Button>
        <Button>刷会员</Button>
        <Button>挂单</Button>
        <Button>取单</Button>
        <Button>赠品</Button>
      </div>
      <div className="item-list">
        {showItemsList.map((o) => {
          return (
            <ItemCard
              key={o.id}
              id={o.id}
              name={o.name}
              price={o.price}
              discountPrice={o.discountPrice}
              des={o.des}
              onClick={addItem}
            ></ItemCard>
          );
        })}
      </div>
      <div className="order-summary">
        <div className="checked-item-card-container">
          <div className="item-name">名称</div>
          <div className="item-price">价格</div>
          <div className="input-count">数目</div>

          <div className="item-discount-price">折扣价</div>
          <div className="item-total-price">总价</div>
        </div>
        <hr />
        <div className="summary-list">
          {Object.keys(checkedItem).map((key) => {
            return (
              <CheckedItemCard
                key={key}
                id={key}
                name={ItemMap[key].name}
                price={ItemMap[key].price}
                count={checkedItem[key]}
                discountPrice={ItemMap[key].discountPrice || ItemMap[key].price}
                changeNum={changeItemCount}
              />
            );
          })}
        </div>
        <div className="summary-statistic">
          <div>合计：</div>
          <div>{totalPrice}</div>
          <div className="submit-btn-container">
            <Button className="submit-btn" type="primary">
              结算
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

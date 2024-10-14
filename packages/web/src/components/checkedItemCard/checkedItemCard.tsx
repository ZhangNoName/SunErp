import { FC, useMemo, useState } from "react";
import "./checkedItemCard.css";
import { Button, Input, InputNumber } from "antd";

interface CheckedItemCardProps {
  id: string;
  name: string;
  price: number;
  count: number;
  discountPrice: number;
  changeNum: Function;
}

export const CheckedItemCard: FC<CheckedItemCardProps> = ({
  id,
  name,
  price,
  count,
  discountPrice,
  changeNum,
}) => {
  const addCount = () => {
    changeNum(id, count + 1);
  };
  const subCount = () => {
    changeNum(id, count - 1);
  };
  const inputCount = (v) => {
    changeNum(id, v);
  };
  const totalPrice = useMemo(() => {
    return count * discountPrice;
  }, [count, discountPrice]);
  return (
    <div className="checked-item-card-container">
      <div className="item-name">{name}</div>
      <div className="item-price">{count}</div>
      <div className="input-count">
        <Button className="input-icon" onClick={addCount}>
          +
        </Button>
        <InputNumber
          controls={false}
          changeOnWheel
          min={0}
          value={count}
          onChange={inputCount}
        />
        <Button className="input-icon" onClick={subCount}>
          -
        </Button>
      </div>

      <div className="item-discount-price">{discountPrice}</div>
      <div className="item-total-price">{totalPrice}</div>
    </div>
  );
};

export default CheckedItemCard;

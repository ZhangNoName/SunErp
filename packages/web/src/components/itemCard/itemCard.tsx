import { FC, useState } from "react";
import "./itemCard.css";
import { ItemCardProps } from "@/type";

export const ItemCard: FC<ItemCardProps> = ({
  name,
  price,
  discountPrice,
  discount,
  des,
  id,
  onClick,
}) => {
  const clickItem = () => {
    onClick && onClick(id);
  };
  return (
    <div className="item-card-container" onClick={clickItem}>
      <div className="item-name">{name}</div>
      <div className="item-price">{price}</div>
      <div className="item-price">{discount}</div>
      <div className="item-price">{discountPrice}</div>
    </div>
  );
};

export default ItemCard;

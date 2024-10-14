import { FC, useState } from "react";
import "./itemCard.css";
import { ItemCardProps } from "@/type";

export const ItemCard: FC<ItemCardProps> = ({
  name,
  price,
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
    </div>
  );
};

export default ItemCard;

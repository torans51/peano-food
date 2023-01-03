import { Accessor } from 'solid-js';

export type DishId = number | string;

export type Dish = {
  id: DishId;
  name: string;
  price: number; // in cents
};

export type Menu = {
  dishes: Dish[];
};

export type OrderItem = {
  dishId: DishId;
  count: number;
  dish: Dish;
};

export type Order = {
  date: string;
  items: Record<DishId, OrderItem>;
};

export type OrderStore = Order & {
  isEmpty: Accessor<boolean>;
  total: Accessor<number>;
  prettify: Accessor<string>;
};

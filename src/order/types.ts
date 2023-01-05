import { Accessor } from 'solid-js';

export type DishId = number | string;

export type DishCategory = {
  code: string;
  position: number;
};

export type Dish = {
  id: DishId;
  category: DishCategory;
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
  totalItems: Accessor<number>;
  prettify: Accessor<string>;
};

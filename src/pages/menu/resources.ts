import { createResource } from 'solid-js';

export type DishId = number | string;

export type Dish = {
  id: DishId;
  name: string;
  price: number; // in cents
};

export type Menu = {
  dishes: Dish[];
};

const fetchMenu = async (): Promise<Menu> => {
  const result = {
    dishes: [
      { id: 1, name: 'Pizza with pepperoni', price: 350 },
      { id: 2, name: 'Pizza with cheese', price: 350 },
    ],
  };

  // Simulate async fetch
  return new Promise(res => {
    setTimeout(() => {
      res(result);
    }, 2000);
  });
};

export const [menu] = createResource(fetchMenu);

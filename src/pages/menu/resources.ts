import { createResource } from 'solid-js';

export type DishId = number | string;

export type Dish = {
  id: DishId;
  name: string;
  price: number;
};

export type Menu = {
  dishes: Dish[];
};

const fetchMenu = async (): Promise<Menu> => {
  return {
    dishes: [
      { id: 1, name: 'Schiacciatina con mortadella', price: 350 },
      { id: 2, name: 'Schiacciatina con prosciutto crudo', price: 350 },
    ],
  };
};

export const [menu] = createResource(fetchMenu);

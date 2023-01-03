import { createResource } from 'solid-js';

import { Menu } from 'src/order/types';

const fetchMenu = async (): Promise<Menu> => {
  const result = {
    dishes: [
      { id: 1, name: 'Pizza with pepperoni', price: 350 },
      { id: 2, name: 'Pizza with cheese', price: 350 },
      { id: 3, name: 'Pizza margherita', price: 200 },
      { id: 4, name: 'Pizza with pepperoni', price: 350 },
      { id: 5, name: 'Pizza with cheese', price: 350 },
      { id: 6, name: 'Pizza margherita', price: 200 },
      { id: 7, name: 'Pizza with pepperoni', price: 350 },
      { id: 8, name: 'Pizza with cheese', price: 350 },
      { id: 9, name: 'Pizza margherita', price: 200 },
      { id: 10, name: 'Pizza with pepperoni', price: 350 },
      { id: 11, name: 'Pizza with cheese', price: 350 },
      { id: 12, name: 'Pizza margherita', price: 200 },
      { id: 13, name: 'Pizza with pepperoni', price: 350 },
      { id: 14, name: 'Pizza with cheese', price: 350 },
      { id: 15, name: 'Pizza margherita', price: 200 },
    ],
  };

  // Simulate async fetch
  return new Promise(res => {
    setTimeout(() => {
      res(result);
    }, 500);
  });
};

export const [menu] = createResource(fetchMenu);

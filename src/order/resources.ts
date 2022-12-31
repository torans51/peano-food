import { createResource } from 'solid-js';

import { Menu } from 'src/order/types';

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

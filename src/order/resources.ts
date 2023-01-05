import { createResource } from 'solid-js';

import { Dish, DishCategory, Menu } from 'src/order/types';

const fetchMenu = async (): Promise<Menu> => {
  const result = {
    dishes: [
      {
        id: 1,
        category: { code: 'pizzas', position: 0 },
        name: 'Pizza with pepperoni',
        price: 350,
      },
      {
        id: 2,
        category: { code: 'pizzas', position: 0 },
        name: 'Pizza with cheese',
        price: 350,
      },
      {
        id: 3,
        category: { code: 'pizzas', position: 0 },
        name: 'Pizza margherita',
        price: 200,
      },
      {
        id: 4,
        category: { code: 'pizzas', position: 0 },
        name: 'Pizza napoli',
        price: 350,
      },
      {
        id: 5,
        category: { code: 'pizzas', position: 0 },
        name: 'Pizza with fries',
        price: 350,
      },
      {
        id: 6,
        category: { code: 'pizzas', position: 0 },
        name: 'Pizza marinara',
        price: 200,
      },
      {
        id: 7,
        category: { code: 'pizzas', position: 0 },
        name: 'Pizza with mushrooms',
        price: 350,
      },
      {
        id: 8,
        category: { code: 'pizzas', position: 0 },
        name: 'Pizza con prosciutto',
        price: 350,
      },
      {
        id: 9,
        category: { code: 'pizzas', position: 0 },
        name: 'Pizza 4 stagioni',
        price: 200,
      },
      {
        id: 10,
        category: { code: 'pizzas', position: 0 },
        name: 'Pizza calzone',
        price: 350,
      },
      {
        id: 11,
        category: { code: 'pizzas', position: 0 },
        name: 'Pizza 4 formaggi',
        price: 350,
      },
      {
        id: 12,
        category: { code: 'pizzas', position: 0 },
        name: 'Pizza antani',
        price: 200,
      },
      {
        id: 13,
        category: { code: 'pizzas', position: 0 },
        name: 'Pizza con sarciccia',
        price: 350,
      },
      {
        id: 14,
        category: { code: 'pizzas', position: 0 },
        name: 'Pizza with hotdogs',
        price: 350,
      },
      {
        id: 15,
        category: { code: 'pizzas', position: 0 },
        name: 'Pizza with olives',
        price: 200,
      },
      {
        id: 16,
        category: { code: 'beverages', position: 1 },
        name: 'Acqua 0.5l',
        price: 100,
      },
      {
        id: 17,
        category: { code: 'beverages', position: 1 },
        name: 'Coca Cola 0.35l',
        price: 250,
      },
    ],
  };

  // Simulate async fetch
  return new Promise(res => {
    setTimeout(() => {
      res(result);
    }, 500);
  });
};

export const sortDishes = (dishes: Dish[]): Dish[] =>
  dishes.sort((d1, d2) => {
    if (d1.category.position === d2.category.position) {
      return d1.name.toLowerCase().localeCompare(d2.name.toLowerCase());
    } else {
      return d1.category.position > d2.category.position ? 1 : -1;
    }
  });

export const sortCategories = (categories: DishCategory[]): DishCategory[] =>
  categories.sort((c1, c2) => {
    if (c1.position === c2.position) {
      return c1.code.toLowerCase().localeCompare(c2.code.toLowerCase());
    } else {
      return c1.position > c2.position ? 1 : -1;
    }
  });

export const [menu] = createResource(fetchMenu);

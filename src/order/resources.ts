import { createResource } from 'solid-js';

import { Dish, DishCategory, Menu } from 'src/order/types';

const fetchMenu = async (): Promise<Menu> => {
  const result = {
    dishes: [
      {
        id: 1,
        category: { code: 'flatbreads', position: 0 },
        name: 'Prosciutto crudo e mozzarella',
        price: 250,
      },
      {
        id: 2,
        category: { code: 'flatbreads', position: 0 },
        name: 'Bresaola, philadelphia e rucola',
        price: 250,
      },
      {
        id: 3,
        category: { code: 'flatbreads', position: 0 },
        name: 'Prosciutto cotto e fontina',
        price: 250,
      },
      {
        id: 4,
        category: { code: 'flatbreads', position: 0 },
        name: 'Mortadella IGP',
        price: 250,
      },
      {
        id: 5,
        category: { code: 'flatbreads', position: 0 },
        name: 'Pomodoro, mozzarella e basilico',
        price: 250,
      },
      {
        id: 6,
        category: { code: 'flatbreads', position: 0 },
        name: 'Schiacciata vuota',
        price: 100,
      },
      {
        id: 7,
        category: { code: 'salad_snacks', position: 1 },
        name: 'Pizzetta',
        price: 200,
      },
      {
        id: 8,
        category: { code: 'salad_snacks', position: 1 },
        name: 'Cipster',
        price: 150,
      },
      {
        id: 9,
        category: { code: 'salad_snacks', position: 1 },
        name: 'Fonzies',
        price: 150,
      },
      {
        id: 10,
        category: { code: 'salad_snacks', position: 1 },
        name: 'Croccantelle',
        price: 150,
      },
      {
        id: 11,
        category: { code: 'salad_snacks', position: 1 },
        name: 'Tuc cracker',
        price: 150,
      },
      {
        id: 12,
        category: { code: 'salad_snacks', position: 1 },
        name: 'Tuc sfoglie',
        price: 150,
      },
      {
        id: 13,
        category: { code: 'salad_snacks', position: 1 },
        name: 'Tuc crackers integrali',
        price: 150,
      },
      {
        id: 14,
        category: { code: 'salad_snacks', position: 1 },
        name: 'Ritz',
        price: 150,
      },
      {
        id: 15,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'Cornetti',
        price: 120,
      },
      {
        id: 16,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'Nutellini',
        price: 150,
      },
      {
        id: 17,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'Kinder cereali',
        price: 120,
      },
      {
        id: 18,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'Kinder delice',
        price: 120,
      },
      {
        id: 19,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'Fiesta',
        price: 120,
      },
      {
        id: 20,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'Fitness barretta cioccolato',
        price: 150,
      },
      {
        id: 21,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'M&M',
        price: 150,
      },
      {
        id: 22,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'Mars',
        price: 150,
      },
      {
        id: 23,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'Twix',
        price: 150,
      },
      {
        id: 24,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'Kit kat',
        price: 180,
      },
      {
        id: 25,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'Loacker',
        price: 180,
      },
      {
        id: 26,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'Kinder bueno',
        price: 200,
      },
      {
        id: 27,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'Kinder cioccolato',
        price: 200,
      },
      {
        id: 28,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'Ciambella senza glutine',
        price: 200,
      },
      {
        id: 29,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'Vigorsol air action',
        price: 120,
      },
      {
        id: 30,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'Big bubble',
        price: 150,
      },
      {
        id: 31,
        category: { code: 'sweet_snacks', position: 2 },
        name: 'Haribo',
        price: 180,
      },
      {
        id: 32,
        category: { code: 'beverages', position: 3 },
        name: 'Acqua naturale 0.5l',
        price: 100,
      },
      {
        id: 33,
        category: { code: 'beverages', position: 3 },
        name: 'Acqua frizzante 0.5l',
        price: 100,
      },
      {
        id: 34,
        category: { code: 'beverages', position: 3 },
        name: 'Coca cola 0.45l',
        price: 100,
      },
      {
        id: 35,
        category: { code: 'beverages', position: 3 },
        name: 'Coca cola zero 0.45l',
        price: 100,
      },
      {
        id: 36,
        category: { code: 'beverages', position: 3 },
        name: 'Fanta 0.45l',
        price: 250,
      },
      {
        id: 37,
        category: { code: 'beverages', position: 3 },
        name: 'Thè pesca 0.40l',
        price: 250,
      },
      {
        id: 38,
        category: { code: 'beverages', position: 3 },
        name: 'Thè limone 0.40l',
        price: 250,
      },
      {
        id: 39,
        category: { code: 'beverages', position: 3 },
        name: 'Estathè brick limone',
        price: 150,
      },
      {
        id: 40,
        category: { code: 'beverages', position: 3 },
        name: 'Estathè brick pesca',
        price: 150,
      },
      {
        id: 41,
        category: { code: 'beverages', position: 3 },
        name: 'Succhi di frutta',
        price: 200,
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

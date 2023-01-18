import { createResource } from 'solid-js';

import { Dish, DishCategory, Menu } from 'src/order/types';

const CAT_CAFETTERIA = { code: 'cafetteria', position: 0 };
const CAT_BEVERAGES = { code: 'beverages', position: 1 };
const CAT_FLATBREADS = { code: 'flatbreads', position: 2 };
const CAT_SNACKS = { code: 'snacks', position: 3 };

const dishes = [
  {
    category: CAT_FLATBREADS,
    name: 'Prosciutto crudo e mozzarella',
    price: 250,
  },
  {
    category: CAT_FLATBREADS,
    name: 'Bresaola, philadelphia e rucola',
    price: 250,
  },
  { category: CAT_FLATBREADS, name: 'Prosciutto cotto e fontina', price: 250 },
  { category: CAT_FLATBREADS, name: 'Mortadella IGP', price: 250 },
  {
    category: CAT_FLATBREADS,
    name: 'Pomodoro, mozzarella e basilico',
    price: 250,
  },
  { category: CAT_FLATBREADS, name: 'Schiacciata vuota', price: 200 },
  { category: CAT_FLATBREADS, name: 'Pizzetta', price: 200 },
  { category: CAT_SNACKS, name: 'Cipster', price: 150 },
  { category: CAT_SNACKS, name: 'Fonzies', price: 150 },
  { category: CAT_SNACKS, name: 'Patatina classica', price: 150 },
  { category: CAT_SNACKS, name: 'Croccantelle', price: 150 },
  { category: CAT_SNACKS, name: 'Tuc cracker', price: 150 },
  { category: CAT_SNACKS, name: 'Tuc sfoglie', price: 150 },
  { category: CAT_SNACKS, name: 'Tuc crackers integrali', price: 150 },
  { category: CAT_SNACKS, name: 'Ritz', price: 150 },
  { category: CAT_SNACKS, name: 'Cornetti', price: 120 },
  { category: CAT_SNACKS, name: 'Nutellini', price: 150 },
  { category: CAT_SNACKS, name: 'Kinder cereali', price: 120 },
  { category: CAT_SNACKS, name: 'Kinder delice', price: 120 },
  { category: CAT_SNACKS, name: 'Fiesta', price: 120 },
  { category: CAT_SNACKS, name: 'Fitness barretta cioccolato', price: 150 },
  { category: CAT_SNACKS, name: 'M&M', price: 150 },
  { category: CAT_SNACKS, name: 'Mars', price: 150 },
  { category: CAT_SNACKS, name: 'Twix', price: 150 },
  { category: CAT_SNACKS, name: 'Kit kat', price: 180 },
  { category: CAT_SNACKS, name: 'Loacker', price: 180 },
  { category: CAT_SNACKS, name: 'Mikado', price: 180 },
  { category: CAT_SNACKS, name: 'Kinder bueno', price: 200 },
  { category: CAT_SNACKS, name: 'Kinder cioccolato astuccio', price: 200 },
  {
    category: CAT_SNACKS,
    name: 'Foodless ciambella senza glutine',
    price: 200,
  },
  { category: CAT_SNACKS, name: 'Halls senza zucchero', price: 120 },
  { category: CAT_SNACKS, name: 'Vigorsol air action', price: 120 },
  { category: CAT_SNACKS, name: 'Big bubble', price: 150 },
  { category: CAT_SNACKS, name: 'Haribo', price: 180 },
  { category: CAT_SNACKS, name: 'Happydent white', price: 220 },
  { category: CAT_BEVERAGES, name: 'Acqua naturale 0.5l', price: 100 },
  { category: CAT_BEVERAGES, name: 'Acqua frizzante 0.5l', price: 100 },
  { category: CAT_BEVERAGES, name: 'Coca cola 0.45l', price: 250 },
  { category: CAT_BEVERAGES, name: 'Coca cola zero 0.45l', price: 250 },
  { category: CAT_BEVERAGES, name: 'Fanta 0.45l', price: 250 },
  { category: CAT_BEVERAGES, name: 'Thè pesca 0.40l', price: 250 },
  { category: CAT_BEVERAGES, name: 'Thè limone 0.40l', price: 250 },
  { category: CAT_BEVERAGES, name: 'Estathè brick limone', price: 150 },
  { category: CAT_BEVERAGES, name: 'Estathè brick pesca', price: 150 },
  { category: CAT_BEVERAGES, name: 'Succhi di frutta', price: 200 },
  { category: CAT_CAFETTERIA, name: 'Cappuccino', price: 120 },
  { category: CAT_CAFETTERIA, name: 'Caffè espresso', price: 100 },
  { category: CAT_CAFETTERIA, name: 'Decaffeinato', price: 120 },
  { category: CAT_CAFETTERIA, name: 'Orzo', price: 120 },
  { category: CAT_CAFETTERIA, name: 'Cioccolata calda', price: 150 },
  { category: CAT_CAFETTERIA, name: 'Thè caldo bustine', price: 150 },
  { category: CAT_CAFETTERIA, name: 'Succhi di frutta', price: 200 },
  { category: CAT_CAFETTERIA, name: 'Cornetti', price: 120 },
];

const fetchMenu = async (): Promise<Menu> => {
  const result = {
    dishes: dishes.map((v, i) => ({ ...v, id: i + 1 })),
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

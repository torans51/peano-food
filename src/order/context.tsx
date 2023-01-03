import {
  createContext,
  createEffect,
  createMemo,
  mergeProps,
  ParentComponent,
  Resource,
} from 'solid-js';
import { createStore } from 'solid-js/store';

import {
  DishId,
  Dish,
  Menu,
  Order,
  OrderItem,
  OrderStore,
} from 'src/order/types';
import { menu } from 'src/order/resources';
import { formatISODate } from 'src/utils/datetime';
import { formatPrice } from 'src/utils/number';

export type ContextModel = {
  menu: Resource<Menu>;
  order: OrderStore;
  resetOrder: () => void;
  getOrderItem: (dishId: DishId) => OrderItem | null;
  addDishToOrder: (dish: Dish) => void;
  removeDishToOrder: (dish: Dish) => void;
};

export const Context = createContext<ContextModel>();

const initState = (): Order => ({
  date: formatISODate(new Date(), 'date'),
  items: {},
});

const LOCAL_STORAGE_KEY = 'order';

const fetch = (): Order => {
  try {
    const item = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!item) return initState();

    return JSON.parse(item);
  } catch (err) {
    console.error('fail to parse order saved in localStorage', err);
    return initState();
  }
};

const save = (state: Order) =>
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));

export const Provider: ParentComponent = props => {
  const [state, setState] = createStore<Order>(fetch());

  createEffect(() => save(state));

  const isEmpty = createMemo(
    () =>
      Object.entries(state.items).filter(([, item]) => item.count > 0)
        .length === 0
  );

  const total = createMemo(() =>
    Object.entries(state.items).reduce((tot, [, item]) => {
      return tot + item.count * item.dish.price;
    }, 0)
  );

  const prettify = createMemo(() => {
    const items = Object.entries(state.items)
      .filter(([, item]) => item.count > 0)
      .map(([, item]) => {
        const { count, dish } = item;
        const partialPrice = formatPrice(count * dish.price);
        return `${dish.name} (x${count})\n\t${partialPrice}`;
      })
      .join('\n------------------\n');

    const result =
      items.length > 0
        ? [
            'Order',
            '===========',
            items,
            '===========',
            `Total: ${formatPrice(total())}`,
          ].join('\n')
        : '';

    return result;
  });

  const resetOrder = () => setState({ items: {} });

  const getOrderItem = (id: DishId) => state.items[id] ?? null;

  const addDishToOrder = (dish: Dish) => {
    if (!state.items[dish.id]) {
      setState('items', dish.id, { dishId: dish.id, count: 1, dish });
      return;
    }

    setState('items', dish.id, item => ({
      dishId: dish.id,
      count: item.count + 1,
      dish,
    }));
  };

  const removeDishToOrder = (dish: Dish) => {
    if (!state.items[dish.id]) return;

    setState('items', dish.id, item => ({
      dishId: dish.id,
      count: item.count > 0 ? item.count - 1 : 0,
      dish,
    }));
  };

  const order = mergeProps(state, { isEmpty, total, prettify });

  const value: ContextModel = {
    // menu: {
    //   dishes: [
    //     { id: 1, name: 'Pizza with pepperoni', price: 350 },
    //     { id: 2, name: 'Pizza with cheese', price: 350 },
    //   ],
    // },
    menu,
    order,
    resetOrder,
    getOrderItem,
    addDishToOrder,
    removeDishToOrder,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

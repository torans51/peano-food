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
import { useI18n } from '@solid-primitives/i18n';
import { capitalize } from 'src/utils/string';

export type ContextModel = {
  menu: Resource<Menu>;
  order: OrderStore;
  resetOrder: () => void;
  getOrderItem: (dishId: DishId) => OrderItem | null;
  getOrderItemTotal: (dishId: DishId) => number | null;
  addDishToOrder: (dish: Dish) => void;
  removeDishToOrder: (dish: Dish) => void;
};

// Force Context to be defined otherwise I have to check if defined in every component
export const Context = createContext<ContextModel>({} as ContextModel);

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
  const [t] = useI18n();

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

  const totalItems = createMemo(() =>
    Object.entries(state.items).reduce((tot, [, item]) => {
      return tot + item.count;
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
            `${capitalize(t('order'))}`,
            '===========',
            items,
            '===========',
            `${capitalize(t('total'))}: ${formatPrice(total())}`,
          ].join('\n')
        : '';

    return result;
  });

  const resetOrder = () => setState({ items: {} });

  const getOrderItem = (id: DishId) => state.items[id] ?? null;

  const getOrderItemTotal = (id: DishId) => {
    const item = getOrderItem(id);
    if (!item) return null;

    return item.count * item.dish.price;
  };

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

  const order = mergeProps(state, { isEmpty, total, totalItems, prettify });

  const value: ContextModel = {
    menu,
    order,
    resetOrder,
    getOrderItem,
    getOrderItemTotal,
    addDishToOrder,
    removeDishToOrder,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

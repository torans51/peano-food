import { createStore } from 'solid-js/store';

import { formatISODate } from '../../utils/datetime';
import { formatPrice } from '../../utils/number';
import { Dish, DishId } from './resources';

type OrderItem = {
  dishId: DishId;
  count: number;
  dish: Dish;
};

type Order = {
  date: string;
  items: Record<DishId, OrderItem>;
};

type OrderStore = Order & {
  isEmpty: boolean;
  total: number;
  prettify: string;
};

const LOCAL_STORAGE_KEY = 'order';

const isEmpty = (o: OrderStore) =>
  Object.keys(o.items).filter(dishId => o.items[dishId].count > 0).length === 0;

const total = (o: OrderStore) =>
  Object.keys(o.items).reduce((t, dishId) => {
    const orderItem = o.items[dishId];
    return t + orderItem.count * orderItem.dish.price;
  }, 0);

const prettify = (o: OrderStore) => {
  const orderItems = Object.keys(o.items)
    .filter(dishId => o.items[dishId].count > 0)
    .map(dishId => {
      const orderItem = o.items[dishId];
      const partialPrice = formatPrice(
        (orderItem.count * orderItem.dish.price) / 100
      );
      return `${orderItem.dish.name} (x${orderItem.count})\n\t${partialPrice}`;
    })
    .join('\n------------------\n');

  const result =
    orderItems.length > 0
      ? [
          'Order',
          '===========',
          orderItems,
          '===========',
          `Total: ${formatPrice(o.total / 100)}`,
        ].join('\n')
      : '';

  return result;
};

const fetchOrder = (): Order | null => {
  try {
    const item = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!item) return null;

    return JSON.parse(item);
  } catch (err) {
    console.error('fail to parse order saved in localStorage', err);
    return null;
  }
};

export const saveOrder = (o: Order) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(o));
};

const initialOrder: Order = fetchOrder() ?? {
  date: formatISODate(new Date(), 'date'),
  items: {},
};

export const [order, setOrder] = createStore<OrderStore>({
  ...initialOrder,
  get isEmpty() {
    return isEmpty(this);
  },
  get total() {
    return total(this);
  },
  get prettify() {
    return prettify(this);
  },
});

export const reset = () => setOrder({ items: {} });

export const addDish = (dish: Dish) => {
  if (!order.items[dish.id]) {
    setOrder('items', dish.id, { dishId: dish.id, count: 1, dish });
    return;
  }

  setOrder('items', dish.id, c => ({
    dishId: dish.id,
    count: c.count + 1,
    dish,
  }));
};

export const removeDish = (dish: Dish) => {
  if (!order.items[dish.id]) return;

  setOrder('items', dish.id, c => ({
    dishId: dish.id,
    count: c.count > 0 ? c.count - 1 : 0,
    dish,
  }));
};

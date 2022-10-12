import { Component, createResource, For, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { HiSolidPlusCircle, HiSolidMinusCircle } from 'solid-icons/hi';

import { formatISODate } from '../utils/datetime';
import { formatPrice } from '../utils/number';

type Menu = {
  dishes: Dish[];
};

type Dish = {
  id: number;
  name: string;
  price: number;
};

const fetchMenu = async (): Promise<Menu> => {
  return {
    dishes: [
      { id: 1, name: 'Schiacciatina con mortadella', price: 350 },
      { id: 2, name: 'Schiacciatina con prosciutto crudo', price: 350 },
    ],
  };
};

const [menu] = createResource(fetchMenu);

type OrderItem = {
  dishId: number | string;
  count: number;
  dish: Dish;
};

type Order = {
  date: string;
  items: Record<number | string, OrderItem>;
  isEmpty: boolean;
  total: number;
  prettify: string;
};

const [order, setOrder] = createStore<Order>({
  date: formatISODate(new Date(), 'date'),
  items: {},
  get isEmpty(): boolean {
    return (
      Object.keys(this.items).filter(dishId => this.items[dishId].count > 0)
        .length === 0
    );
  },
  get total(): number {
    return Object.keys(this.items).reduce((t, dishId) => {
      const orderItem = this.items[dishId];
      return t + orderItem.count * orderItem.dish.price;
    }, 0);
  },
  get prettify(): string {
    const orderItems = Object.keys(this.items)
      .filter(dishId => this.items[dishId].count > 0)
      .map(dishId => {
        const orderItem = this.items[dishId];
        const partialPrice = formatPrice(
          (orderItem.count * orderItem.dish.price) / 100
        );
        return `${orderItem.dish.name} (x${orderItem.count})\n\t${partialPrice}`;
      })
      .join('\n------------------\n');

    const result = [
      'Order',
      '===========',
      orderItems,
      '===========',
      `Total: ${formatPrice(this.total / 100)}`,
    ].join('\n');

    return result;
  },
});

const addDish = (dish: Dish) => {
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

const removeDish = (dish: Dish) => {
  if (!order.items[dish.id]) return;

  setOrder('items', dish.id, c => ({
    dishId: dish.id,
    count: c.count > 0 ? c.count - 1 : 0,
    dish,
  }));
};

const MenuPage: Component = () => {
  const copyOrder = () => {
    navigator.clipboard.writeText(order.prettify);
  };

  return (
    <div class="flex flex-col space-y-4">
      <Show when={menu()} keyed fallback={<div>Loading ...</div>}>
        {m => (
          <For each={m.dishes}>
            {dish => (
              <div class="flex items-center space-x-2">
                <div class="font-semibold grow">
                  {dish.name}
                  <p>{formatPrice(dish.price / 100)}</p>
                </div>
                <div>{order.items[dish.id]?.count ?? ''}</div>
                <div class="flex items-center space-x-1">
                  <HiSolidPlusCircle
                    size={24}
                    class="text-red-500 cursor-pointer"
                    onClick={() => addDish(dish)}
                  />
                  <HiSolidMinusCircle
                    size={24}
                    class="text-red-500 cursor-pointer"
                    onClick={() => removeDish(dish)}
                  />
                </div>
              </div>
            )}
          </For>
        )}
      </Show>

      <button
        class="block p-2 rounded-md bg-red-500 text-white font-semibold"
        onClick={() => copyOrder()}
      >
        Copia ordine
      </button>

      <Show when={!order.isEmpty}>
        <textarea class="border min-h-[12rem]" value={order.prettify} />
      </Show>
    </div>
  );
};

export default MenuPage;

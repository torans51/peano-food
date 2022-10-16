import { HiSolidMinusCircle, HiSolidPlusCircle } from 'solid-icons/hi';
import { Component, createEffect, For, Show } from 'solid-js';

import { formatPrice } from '../../utils/number';
import { menu } from './resources';
import { addDish, order, removeDish, reset, saveOrder } from './stores';

const page: Component = () => {
  createEffect(() => saveOrder(order));

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

      <button
        class="block p-2 rounded-md bg-gray-200 font-semibold"
        onClick={() => reset()}
      >
        Cancella ordine
      </button>

      <Show when={!order.isEmpty}>
        <textarea class="border min-h-[12rem]" value={order.prettify} />
      </Show>
    </div>
  );
};

export default page;

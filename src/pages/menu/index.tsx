import { HiSolidMinusCircle, HiSolidPlusCircle } from 'solid-icons/hi';
import { Component, createEffect, For, Show } from 'solid-js';

import { classnames } from 'src/utils/classnames';
import { formatPrice } from 'src/utils/number';
import { menu } from 'src/pages/menu/resources';
import {
  addDish,
  order,
  removeDish,
  reset,
  saveOrder,
} from 'src/pages/menu/stores';
import { Spinner } from 'src/components';

const Page: Component = () => {
  createEffect(() => saveOrder(order));

  const copyOrder = () => {
    navigator.clipboard.writeText(order.prettify);
  };

  return (
    <div class="flex flex-col space-y-4">
      <div class="min-h-14">
        <Show when={menu()} keyed fallback={<Spinner />}>
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
      </div>

      <button
        class={classnames(
          !menu.loading ? 'hover:bg-white hover:text-red-500 hover' : '',
          'p-2 rounded-md bg-red-500 text-white font-semibold border-2 border-red-500'
        )}
        disabled={menu.loading}
        onClick={() => copyOrder()}
      >
        Copia ordine
      </button>

      <button
        class={classnames(
          !menu.loading ? 'hover:bg-gray-300' : '',
          'p-2 rounded-md bg-gray-200 font-semibold'
        )}
        disabled={menu.loading}
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

export default Page;

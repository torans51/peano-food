import { HiSolidMinusCircle, HiSolidPlusCircle } from 'solid-icons/hi';
import { Component, createEffect, For, Show } from 'solid-js';

import { formatPrice } from 'src/utils/number';
import { Dish, DishId, menu } from 'src/pages/menu/resources';
import {
  addDish,
  order,
  removeDish,
  reset,
  saveOrder,
} from 'src/pages/menu/stores';
import { Spinner, PrimaryBtn, CancelBtn } from 'src/components';

const DishWrapper: Component<{ dish: Dish }> = props => {
  const dishCount = (dishId: DishId) => order.items[dishId]?.count ?? 0;

  return (
    <div class="flex items-center space-x-2">
      <div class="font-semibold grow">
        <p>{props.dish.name}</p>
        <p>{formatPrice(props.dish.price / 100)}</p>
      </div>
      <div>{dishCount(props.dish.id)}</div>
      <div class="flex items-center space-x-1">
        <HiSolidPlusCircle
          size={24}
          class="text-red-500 cursor-pointer"
          onClick={() => addDish(props.dish)}
        />
        <HiSolidMinusCircle
          size={24}
          class="text-red-500 cursor-pointer"
          onClick={() => removeDish(props.dish)}
        />
      </div>
    </div>
  );
};

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
            <For each={m.dishes}>{dish => <DishWrapper dish={dish} />}</For>
          )}
        </Show>
      </div>

      <PrimaryBtn
        text={'Copy order'}
        onClick={copyOrder}
        disabled={menu.loading}
      />

      <CancelBtn
        text={'Delete order'}
        onClick={reset}
        disabled={menu.loading}
      />

      <Show when={!order.isEmpty && !menu.loading}>
        <textarea class="border min-h-[12rem]" value={order.prettify} />
      </Show>
    </div>
  );
};

export default Page;

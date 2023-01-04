import { Component, For, Show, useContext } from 'solid-js';

import { OrderContext } from 'src/order';
import { DishCard } from 'src/components';

const Page: Component = () => {
  const { menu } = useContext(OrderContext);

  return (
    <div class="px-2 py-3 flex flex-col space-y-3">
      <Show when={menu()} keyed>
        {m => <For each={m.dishes}>{dish => <DishCard dish={dish} />}</For>}
      </Show>
    </div>
  );
};

export default Page;

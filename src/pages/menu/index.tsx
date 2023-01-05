import { Component, For, Show } from 'solid-js';

import { useOrderContext } from 'src/order';
import { DishCard } from 'src/components';

const Page: Component = () => {
  const { menu } = useOrderContext();

  return (
    <div class="px-2 py-3 flex flex-col space-y-3">
      <Show when={menu()} keyed>
        {m => <For each={m.dishes}>{dish => <DishCard dish={dish} />}</For>}
      </Show>
    </div>
  );
};

export default Page;

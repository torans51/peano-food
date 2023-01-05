import { Component, For } from 'solid-js';

import { useOrderContext } from 'src/order';
import { DishCard } from 'src/components';
import { useI18n } from '@solid-primitives/i18n';

const Page: Component = () => {
  const [t] = useI18n();

  const { categories, dishByCategory } = useOrderContext();

  return (
    <div class="px-2 py-3 flex flex-col space-y-4">
      <For each={categories()}>
        {category => (
          <div>
            <p class="capitalize font-semibold text-neutral-600 text-lg">
              {t(category.code)}
            </p>
            <div class="flex flex-col space-y-3">
              <For each={dishByCategory(category)}>
                {dish => <DishCard dish={dish} />}
              </For>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

export default Page;

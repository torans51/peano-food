import { Component, For } from 'solid-js';

import { DishCategory, useOrderContext } from 'src/order';
import { DishCard } from 'src/components';
import { useI18n } from '@solid-primitives/i18n';

const Page: Component = () => {
  const { categories } = useOrderContext();

  return (
    <div class="h-full py-3 flex flex-col space-y-2">
      <div class="overflow-x-auto px-2 flex space-x-2 items-center justify-start whitespace-nowrap">
        <CategoriesScrollable categories={categories()} />
      </div>
      <div class="overflow-y-auto px-2 flex-1 flex flex-col space-y-4">
        <Categories categories={categories()} />
      </div>
    </div>
  );
};

const CategoriesScrollable: Component<{
  categories: DishCategory[];
}> = props => {
  const [t] = useI18n();

  const scrollToCategory = (category: DishCategory) => {
    document
      .getElementById(category.code)
      ?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  return (
    <For each={props.categories}>
      {category => (
        <button
          class="my-2 capitalize text-neutral-600 px-2 rounded-xl app-border-gradient"
          onClick={() => scrollToCategory(category)}
        >
          {t(category.code)}
        </button>
      )}
    </For>
  );
};

const Categories: Component<{ categories: DishCategory[] }> = props => {
  const [t] = useI18n();

  const { dishByCategory } = useOrderContext();

  return (
    <For each={props.categories}>
      {category => (
        <div id={category.code}>
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
  );
};

export default Page;

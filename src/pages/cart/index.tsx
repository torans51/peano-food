import { useI18n } from '@solid-primitives/i18n';
import { Component, createMemo, For, Show } from 'solid-js';
import { DishCard } from 'src/components';

import { useOrderContext } from 'src/order';
import { formatPrice } from 'src/utils/number';
import { capitalize } from 'src/utils/string';

const Page: Component = () => {
  const [t] = useI18n();

  const { menu, sortDishes, order, getOrderItem } = useOrderContext();

  const orderItemsFromMenu = createMemo(() => {
    const dishes = menu()?.dishes ?? [];
    return sortDishes(dishes.filter(d => getOrderItem(d.id)?.count ?? 0 > 0));
  });

  return (
    <div class="h-full overflow-y-auto px-2 py-3 flex flex-col space-y-3">
      <Show when={order.totalItems() > 0} fallback={<EmptyOrder />}>
        <p class="px-2 font-semibold text-lg text-right text-neutral-600">
          {`${capitalize(t('total'))}: ${formatPrice(order.total())}`}
        </p>
        <For each={orderItemsFromMenu()}>
          {dish => <DishCard dish={dish} showSubTotal />}
        </For>
      </Show>
    </div>
  );
};

const EmptyOrder = () => {
  const [t] = useI18n();

  return (
    <div class="p-6 flex flex-col items-center justify-center">
      <p class="text-center text-neutral-400">{capitalize(t('empty_order'))}</p>
    </div>
  );
};

export default Page;

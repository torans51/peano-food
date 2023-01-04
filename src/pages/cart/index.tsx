import { Component, createMemo, For, useContext } from 'solid-js';
import { DishCard } from 'src/components';

import { OrderContext } from 'src/order';
import { formatPrice } from 'src/utils/number';

const Page: Component = () => {
  const { menu, order, getOrderItem } = useContext(OrderContext);

  const orderItemsFromMenu = createMemo(() => {
    const m = menu();
    return m ? m.dishes.filter(d => getOrderItem(d.id)?.count ?? 0 > 0) : [];
  });

  return (
    <div class="px-2 py-3 flex flex-col space-y-3">
      <p class="px-2 font-semibold text-lg text-right text-neutral-600">
        Totale: {formatPrice(order.total())}
      </p>
      <For each={orderItemsFromMenu()}>
        {dish => <DishCard dish={dish} showSubTotal />}
      </For>
    </div>
  );
};

export default Page;

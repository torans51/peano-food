import { HiSolidMinusCircle, HiSolidPlusCircle } from 'solid-icons/hi';
import { Component, For, Show, useContext } from 'solid-js';

import { formatPrice } from 'src/utils/number';
import { Spinner, PrimaryBtn, CancelBtn } from 'src/components';
import { OrderContext, Dish, OrderStore } from 'src/order';

const DishWrapper: Component<{ dish: Dish }> = props => {
  const orderContext = useContext(OrderContext);

  return (
    <Show when={orderContext} keyed>
      {({ getOrderItem, addDishToOrder, removeDishToOrder }) => (
        <div class="flex items-center space-x-2">
          <div class="font-semibold grow">
            <p>{props.dish.name}</p>
            <p>{formatPrice(props.dish.price / 100)}</p>
          </div>
          <div>{getOrderItem(props.dish.id)?.count ?? 0}</div>
          <div class="flex items-center space-x-1">
            <HiSolidPlusCircle
              size={24}
              class="text-red-500 cursor-pointer"
              onClick={() => addDishToOrder(props.dish)}
            />
            <HiSolidMinusCircle
              size={24}
              class="text-red-500 cursor-pointer"
              onClick={() => removeDishToOrder(props.dish)}
            />
          </div>
        </div>
      )}
    </Show>
  );
};

const Page: Component = () => {
  const orderContext = useContext(OrderContext);

  const copyOrder = (order: OrderStore) => {
    navigator.clipboard.writeText(order.prettify() ?? '');
  };

  return (
    <Show when={orderContext} keyed>
      {({ menu, order, resetOrder }) => (
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
            onClick={() => copyOrder(order)}
            disabled={menu.loading}
          />

          <CancelBtn
            text={'Delete order'}
            onClick={resetOrder}
            disabled={menu.loading}
          />

          <Show when={!order.isEmpty() && !menu.loading}>
            <textarea class="border min-h-[12rem]" value={order.prettify()} />
          </Show>
        </div>
      )}
    </Show>
  );
};

export default Page;

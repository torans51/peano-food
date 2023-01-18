import { Component, Show } from 'solid-js';
import { Dish, useOrderContext } from 'src/order';

import { formatPrice } from 'src/utils/number';
import { AddDishBtn, RemoveDishBtn } from 'src/components';

type Props = {
  dish: Dish;
  showSubTotal?: boolean;
};

const DishCard: Component<Props> = props => {
  const { getOrderItem, getOrderItemTotal } = useOrderContext();

  return (
    <div class="bg-white rounded-md shadow-lg px-2 py-3 flex flex-col space-y-2">
      <div class="flex">
        <div class="w-2/3">
          <div class="font-semibold text-neutral-600">{props.dish.name}</div>
          <div class="text-neutral-400">{formatPrice(props.dish.price)}</div>
        </div>
        <div class="w-1/3 flex items-center justify-end space-x-2">
          <RemoveDishBtn dish={props.dish} />
          <p class="text-neutral-600">
            {getOrderItem(props.dish.id)?.count ?? 0}
          </p>
          <AddDishBtn dish={props.dish} />
        </div>
      </div>
      <Show when={props.showSubTotal}>
        <div class="border border-t-neutral-100" />
        <div class="text-right text-neutral-600">
          {formatPrice(getOrderItemTotal(props.dish.id) ?? 0)}
        </div>
      </Show>
    </div>
  );
};

export default DishCard;

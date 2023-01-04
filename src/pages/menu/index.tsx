import { Component, For, Show, useContext } from 'solid-js';
import { HiOutlinePlus, HiOutlineMinus } from 'solid-icons/hi';

import { OrderContext } from 'src/order';
import { formatPrice } from 'src/utils/number';

const Page: Component = () => {
  const { menu, getOrderItem, addDishToOrder, removeDishToOrder } =
    useContext(OrderContext);

  return (
    <div class="px-2 py-3 flex flex-col space-y-3">
      <Show when={menu()} keyed>
        {m => (
          <For each={m.dishes}>
            {dish => (
              <div class="bg-white rounded-md shadow-lg px-2 py-3 flex">
                <div class="w-2/3">
                  <div class="font-semibold text-neutral-600">{dish.name}</div>
                  <div class="text-neutral-400 text-sm">
                    {formatPrice(dish.price)}
                  </div>
                </div>
                <div class="w-1/3 flex items-center justify-end space-x-4">
                  <HiOutlineMinus
                    size={22}
                    class="text-blue-400 cursor-pointer [&>path]:stroke-[2]"
                    onClick={() => removeDishToOrder(dish)}
                  />
                  <p class="text-neutral-600 text-sm">
                    {getOrderItem(dish.id)?.count ?? 0}
                  </p>
                  <HiOutlinePlus
                    size={22}
                    class="text-purple-400 cursor-pointer [&>path]:stroke-[2]"
                    onClick={() => addDishToOrder(dish)}
                  />
                </div>
              </div>
            )}
          </For>
        )}
      </Show>
    </div>
  );
};

export default Page;

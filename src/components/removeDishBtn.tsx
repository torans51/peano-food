import { HiOutlineMinus } from 'solid-icons/hi';
import { Component } from 'solid-js';

import { Dish, useOrderContext } from 'src/order';

type Props = {
  dish: Dish;
};

const RemoveDishBtn: Component<Props> = props => {
  const { removeDishToOrder } = useOrderContext();

  return (
    <button
      class="h-8 w-8 flex items-center justify-center"
      onClick={() => removeDishToOrder(props.dish)}
    >
      <HiOutlineMinus
        size={22}
        class="text-primary1 cursor-pointer [&>path]:stroke-[2]"
      />
    </button>
  );
};

export default RemoveDishBtn;

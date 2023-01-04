import { HiOutlineMinus } from 'solid-icons/hi';
import { Component, useContext } from 'solid-js';

import { Dish, OrderContext } from 'src/order';

type Props = {
  dish: Dish;
};

const RemoveDishBtn: Component<Props> = props => {
  const { removeDishToOrder } = useContext(OrderContext);

  return (
    <button
      class="h-8 w-8 flex items-center justify-center"
      onClick={() => removeDishToOrder(props.dish)}
    >
      <HiOutlineMinus
        size={22}
        class="text-blue-400 cursor-pointer [&>path]:stroke-[2]"
      />
    </button>
  );
};

export default RemoveDishBtn;

import { HiOutlinePlus } from 'solid-icons/hi';
import { Component } from 'solid-js';

import { Dish, useOrderContext } from 'src/order';

type Props = {
  dish: Dish;
};

const AddDishBtn: Component<Props> = props => {
  const { addDishToOrder } = useOrderContext();
  return (
    <button
      class="h-8 w-8 flex items-center justify-center"
      onClick={() => addDishToOrder(props.dish)}
    >
      <HiOutlinePlus
        size={22}
        class="text-primary2 cursor-pointer [&>path]:stroke-[2]"
      />
    </button>
  );
};

export default AddDishBtn;

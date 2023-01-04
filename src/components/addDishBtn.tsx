import { HiOutlinePlus } from 'solid-icons/hi';
import { Component, useContext } from 'solid-js';

import { Dish, OrderContext } from 'src/order';

type Props = {
  dish: Dish;
};

const AddDishBtn: Component<Props> = props => {
  const { addDishToOrder } = useContext(OrderContext);

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

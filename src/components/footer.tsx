import { useLocation, useNavigate } from '@solidjs/router';
import {
  HiOutlineArrowSmLeft,
  HiOutlineClipboardCopy,
  HiOutlineShoppingCart,
  HiOutlineTrash,
} from 'solid-icons/hi';
import { Component, Match, Show, Switch, useContext } from 'solid-js';
import { toast } from 'solid-toast';

import { OrderContext, OrderStore } from 'src/order';
import { formatPrice } from 'src/utils/number';

const Footer: Component = () => {
  const location = useLocation();

  return (
    <div class="bg-white flex space-x-2 p-2">
      <Switch>
        <Match when={location.pathname === '/cart'}>
          <BackButton />
          <CopyCartButton />
        </Match>
        <Match when={location.pathname === '/'}>
          <ResetButton />
          <CartButton />
        </Match>
      </Switch>
    </div>
  );
};

const ResetButton: Component = () => {
  const { resetOrder } = useContext(OrderContext);

  return (
    <button
      class="flex-1 rounded-md border border-neutral-600 flex justify-center items-center py-1.5"
      onClick={resetOrder}
    >
      <HiOutlineTrash size={22} class="text-neutral-600" />
    </button>
  );
};

const BackButton: Component = () => {
  const navigate = useNavigate();

  return (
    <button
      class="flex-1 rounded-md border border-neutral-600 flex justify-center items-center py-1.5"
      onClick={() => navigate('/')}
    >
      <HiOutlineArrowSmLeft size={22} class="text-neutral-600" />
    </button>
  );
};

const CartButton: Component = () => {
  const navigate = useNavigate();

  const { order } = useContext(OrderContext);

  return (
    <button
      class="flex-1 rounded-md border bg-gradient-to-br from-blue-400 to-purple-400 flex justify-center items-center space-x-2"
      onClick={() => navigate('/cart')}
    >
      <HiOutlineShoppingCart size={22} class="text-white" />
      <Show when={order.totalItems() > 0}>
        <p class="text-white">{order.totalItems}</p>
      </Show>
    </button>
  );
};

const CopyCartButton: Component = () => {
  const { order } = useContext(OrderContext);

  const copyOrder = (order: OrderStore) => {
    navigator.clipboard.writeText(order.prettify() ?? '');
    toast('Ordine copiato');
  };

  return (
    <button
      class="flex-1 rounded-md border bg-gradient-to-br from-blue-400 to-purple-400 flex justify-center items-center space-x-2"
      onClick={() => copyOrder(order)}
    >
      <p class="text-white">{formatPrice(order.total())}</p>
      <HiOutlineClipboardCopy size={22} class="text-white" />
    </button>
  );
};

export default Footer;

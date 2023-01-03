import { useLocation, useNavigate } from '@solidjs/router';
import {
  HiOutlineArrowSmLeft,
  HiOutlineClipboardCopy,
  HiOutlineShoppingCart,
  HiOutlineTrash,
} from 'solid-icons/hi';
import { Component, Show, useContext } from 'solid-js';
import { toast } from 'solid-toast';

import { OrderContext, OrderStore } from 'src/order';

const Footer: Component = () => {
  const location = useLocation();

  const orderContext = useContext(OrderContext);

  return (
    <Show when={orderContext}>
      <div class="bg-white flex space-x-2 p-2">
        {location.pathname === '/cart' && (
          <>
            <BackButton />
            <CopyCartButton />
          </>
        )}
        {location.pathname === '/' && (
          <>
            <ResetButton />
            <CartButton />
          </>
        )}
      </div>
    </Show>
  );
};

const ResetButton: Component = () => {
  const orderContext = useContext(OrderContext);

  return (
    <Show when={orderContext} keyed>
      {({ resetOrder }) => (
        <button
          class="flex-1 rounded-md border border-neutral-600 flex justify-center items-center py-1.5"
          onClick={resetOrder}
        >
          <HiOutlineTrash size={22} class="text-neutral-600" />
        </button>
      )}
    </Show>
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
  const orderContext = useContext(OrderContext);

  return (
    <Show when={orderContext} keyed>
      {({ order }) => (
        <button
          class="flex-1 rounded-md border bg-gradient-to-br from-blue-400 to-purple-400 flex justify-center items-center space-x-2"
          onClick={() => navigate('/cart')}
        >
          <HiOutlineShoppingCart size={22} class="text-white" />
          <Show when={order.totalItems() > 0}>
            <p class="text-white">{order.totalItems}</p>
          </Show>
        </button>
      )}
    </Show>
  );
};

const CopyCartButton: Component = () => {
  const orderContext = useContext(OrderContext);

  const copyOrder = (order: OrderStore) => {
    navigator.clipboard.writeText(order.prettify() ?? '');
    toast('Ordine copiato');
  };

  return (
    <Show when={orderContext} keyed>
      {({ order }) => (
        <button
          class="flex-1 rounded-md border bg-gradient-to-br from-blue-400 to-purple-400 flex justify-center items-center space-x-2"
          onClick={() => copyOrder(order)}
        >
          <HiOutlineClipboardCopy size={22} class="text-white" />
        </button>
      )}
    </Show>
  );
};

export default Footer;

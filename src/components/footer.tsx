import { useI18n } from '@solid-primitives/i18n';
import { useLocation, useNavigate } from '@solidjs/router';
import {
  HiOutlineArrowSmLeft,
  HiOutlineClipboardCopy,
  HiOutlineShoppingCart,
  HiOutlineTrash,
} from 'solid-icons/hi';
import { Component, Match, Show, Switch } from 'solid-js';
import { toast } from 'solid-toast';

import { OrderStore, useOrderContext } from 'src/order';
import { formatPrice } from 'src/utils/number';
import { capitalize } from 'src/utils/string';

const Footer: Component = () => {
  const location = useLocation();

  return (
    <div class="bg-white flex space-x-2 p-2">
      <Switch>
        <Match when={location.pathname === '/cart'}>
          <BackBtn />
          <CopyCartBtn />
        </Match>
        <Match when={location.pathname === '/'}>
          <ResetBtn />
          <CartBtn />
        </Match>
      </Switch>
    </div>
  );
};

const ResetBtn: Component = () => {
  const { resetOrder } = useOrderContext();

  return (
    <button class="flex-1 btn btn-default" onClick={resetOrder}>
      <HiOutlineTrash size={22} class="text-neutral-600" />
    </button>
  );
};

const BackBtn: Component = () => {
  const navigate = useNavigate();

  return (
    <button class="flex-1 btn btn-default" onClick={() => navigate('/')}>
      <HiOutlineArrowSmLeft size={22} class="text-neutral-600" />
    </button>
  );
};

const CartBtn: Component = () => {
  const navigate = useNavigate();

  const { order } = useOrderContext();

  return (
    <button class="flex-1 btn btn-primary" onClick={() => navigate('/cart')}>
      <HiOutlineShoppingCart size={22} class="stroke-white" />
      <Show when={order.totalItems() > 0}>
        <p class="text-white">{order.totalItems}</p>
      </Show>
    </button>
  );
};

const CopyCartBtn: Component = () => {
  const [t] = useI18n();

  const { order } = useOrderContext();

  const copyOrder = (order: OrderStore) => {
    navigator.clipboard.writeText(order.prettify() ?? '');
    toast(capitalize(t('order_copied')));
  };

  return (
    <button class="flex-1 btn btn-primary" onClick={() => copyOrder(order)}>
      <p class="text-white">{formatPrice(order.total())}</p>
      <HiOutlineClipboardCopy size={22} class="stroke-white" />
    </button>
  );
};

export default Footer;

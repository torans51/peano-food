import { Show, useContext } from 'solid-js';
import { toast } from 'solid-toast';

import { OrderContext, OrderStore } from 'src/order';

const Footer = () => {
  const orderContext = useContext(OrderContext);

  const copyOrder = (order: OrderStore) => {
    navigator.clipboard.writeText(order.prettify() ?? '');
    toast('Ordine copiato');
  };

  return (
    <Show when={orderContext} keyed>
      {({ order, resetOrder }) => (
        <div class="bg-white flex space-x-2 p-2">
          <button
            class="flex-1 rounded-md border border-neutral-600 text-neutral-800 text-sm py-1.5"
            onClick={resetOrder}
          >
            Cancella
          </button>
          <button
            class="flex-1 rounded-md border bg-gradient-to-br from-blue-400 to-purple-400 text-white text-sm"
            onClick={() => copyOrder(order)}
          >
            Copia
          </button>
        </div>
      )}
    </Show>
  );
};

export default Footer;

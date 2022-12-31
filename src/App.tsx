import type { Component } from 'solid-js';

import { OrderProvider } from 'src/order';
import { MenuPage } from 'src/pages';

const App: Component = () => {
  return (
    <OrderProvider>
      <div class="mx-auto max-w-xs py-6 px-3 border-2">
        <MenuPage />
      </div>
    </OrderProvider>
  );
};

export default App;

import { Component } from 'solid-js';
import { Toaster } from 'solid-toast';

import { OrderProvider } from 'src/order';
import { CartPage, MenuPage } from 'src/pages';
import { Header, Footer } from 'src/components';
import { Route, Routes } from '@solidjs/router';

const App: Component = () => {
  return (
    <OrderProvider>
      <div class="h-screen flex justify-center">
        <div class="flex-1 h-full w-full bg-neutral-50 flex flex-col">
          <Header />
          <div class="flex-1 overflow-y-auto mb-12">
            <Routes>
              <Route path="/cart" component={CartPage} />
              <Route path="/" component={MenuPage} />
            </Routes>
          </div>
          <div class="fixed w-full bottom-0">
            <Footer />
          </div>
        </div>
        <Toaster
          position="bottom-center"
          containerClassName="mb-12"
          toastOptions={{
            duration: 1000,
            className:
              'border border-t-blue-400 border-l-blue-400 border-b-purple-400 border-r-purple-400 shadow-xl shadow-blue-400',
          }}
        />
      </div>
    </OrderProvider>
  );
};

export default App;

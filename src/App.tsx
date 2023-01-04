import { Component } from 'solid-js';
import { Toaster } from 'solid-toast';

import { OrderProvider } from 'src/order';
import { CartPage, MenuPage } from 'src/pages';
import { Header, Footer } from 'src/components';
import { Route, Routes } from '@solidjs/router';
import { I18NProvider } from 'src/i18n';

const App: Component = () => {
  return (
    <I18NProvider>
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
                'border border-t-primary1 border-l-primary1 border-b-primary2 border-r-primary2',
            }}
          />
        </div>
      </OrderProvider>
    </I18NProvider>
  );
};

export default App;

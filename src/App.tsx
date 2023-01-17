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
        <div class="h-screen w-screen">
          <div class="h-full bg-neutral-50 flex flex-col">
            <Header />
            <div class="flex-1 overflow-hidden">
              <Routes>
                <Route path="/cart" component={CartPage} />
                <Route path="/" component={MenuPage} />
              </Routes>
            </div>
            <Footer />
          </div>
          <Toaster
            position="bottom-center"
            containerClassName="mb-12"
            toastOptions={{
              duration: 1000,
              className: 'app-border-gradient',
            }}
          />
        </div>
      </OrderProvider>
    </I18NProvider>
  );
};

export default App;

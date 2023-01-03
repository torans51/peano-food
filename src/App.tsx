import { Component } from 'solid-js';
import { Toaster } from 'solid-toast';

import { OrderProvider } from 'src/order';
import { MenuPage } from 'src/pages';
import { Header, Footer } from 'src/components';

const App: Component = () => {
  return (
    <OrderProvider>
      <div class="flex justify-center">
        <div class="flex-1 h-screen max-w-md bg-neutral-50 flex flex-col">
          <Header />
          <div class="flex-1 overflow-y-auto">
            <MenuPage />
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
          <Footer />
        </div>
      </div>
    </OrderProvider>
  );
};

export default App;

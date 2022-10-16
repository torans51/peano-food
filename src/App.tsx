import type { Component } from 'solid-js';

import { MenuPage } from './pages';

const App: Component = () => {
  return (
    <div class="mx-auto max-w-xs py-6 px-3 border-2">
      <MenuPage />
    </div>
  );
};

export default App;

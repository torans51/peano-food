import type { Component } from 'solid-js';

import { Menu } from './pages';

const App: Component = () => {
  return (
    <div class="max-w-xs py-6 px-3 border-2">
      <Menu />
    </div>
  );
};

export default App;

import { Component } from 'solid-js';

const Spinner: Component = () => {
  return (
    <div class="flex items-center justify-center">
      <div class="h-5 w-5 border-4 border-t-red-500 rounded-full animate-spin" />
    </div>
  );
};

export default Spinner;

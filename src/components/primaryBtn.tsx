import { Component } from 'solid-js';

import { classnames } from 'src/utils/classnames';

const PrimaryBtn: Component<{
  text: string;
  onClick: () => void;
  disabled: boolean;
}> = props => {
  return (
    <button
      class={classnames(
        !props.disabled ? 'hover:bg-white hover:text-red-500 hover' : '',
        'p-2 rounded-md bg-red-500 text-white font-semibold border-2 border-red-500'
      )}
      disabled={props.disabled}
      onClick={() => props.onClick()}
    >
      Copy order
    </button>
  );
};

export default PrimaryBtn;

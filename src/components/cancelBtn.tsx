import { Component } from 'solid-js';

import { classnames } from 'src/utils/classnames';

const cancelBtn: Component<{
  text: string;
  onClick: () => void;
  disabled: boolean;
}> = props => {
  return (
    <button
      class={classnames(
        !props.disabled ? 'hover:bg-gray-300' : '',
        'p-2 rounded-md bg-gray-200 font-semibold'
      )}
      disabled={props.disabled}
      onClick={() => props.onClick()}
    >
      {props.text}
    </button>
  );
};

export default cancelBtn;

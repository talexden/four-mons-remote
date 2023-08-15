import './button.css'
import {ButtonType} from '../../types/types';

type ButtonPropsType = {
  btn: ButtonType,
  action: (title: string) => void,
  mod?:  boolean,
}



function Button ({btn, mod, action}: ButtonPropsType): JSX.Element {

  const HandleOnClick = function () {
    action(btn.title)
  }


  return (
    <button
      type='button'
      className={`button ${btn.className}${mod ? ` ${btn.className}--active` : ''}`}
      onClick={HandleOnClick}
    >
      {btn.title}
    </button>
);
}

export default Button;
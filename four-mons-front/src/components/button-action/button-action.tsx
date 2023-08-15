import {ButtonType} from '../../types/types';
import {Command, REPEAT_COMMAND_TIME} from '../../common/const';

type ButtonPropsType = {
  btn: ButtonType,
  action: (command: string, data: any) => void,
  device: string,
  motor: string,
  dir: string,
  position?: string,
}



function ButtonAction ({btn, action, device, motor, dir, position}: ButtonPropsType): JSX.Element {
  let t:number;
  motor = `${Number(device) * 2 - 2 + Number(motor)}`;

  const repeat = function () {
    action(btn.command, {motor, dir, position, command: 1});
    t = setTimeout(repeat, REPEAT_COMMAND_TIME);
  }

  const HandleOnMouseDown = () => {
    if (device) repeat();
  };

  const HandleOnMouseUp = () => {
    if (device) clearTimeout(t);
    action(Command.Stop, {motor, dir, position, command: 0});
  };


  return (
    <button
      type='button'
      className={`unselectable button ${btn.className}`}
      onMouseDown={HandleOnMouseDown}
      onTouchStart={HandleOnMouseDown}
      onTouchEnd={HandleOnMouseUp}
      onLostPointerCapture={HandleOnMouseUp}
      onMouseUp={HandleOnMouseUp}
    >
      {btn.title}
    </button>
);
}

export default ButtonAction;
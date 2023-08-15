import './remote.css';
import {btn} from '../../common/const';
import Radio from '../radio/radio';
import ButtonAction from '../button-action/button-action';

type RemotePropsType = {
  onClick: (title: string, data: any)=> void,
  device: string,
  setDevice: (id: string) => void,
}


function Remote ({onClick, setDevice, device}: RemotePropsType):JSX.Element {
  return (
    <div className='remote'>
      <ul className='device device-selector'>
        <li className='device__item'>
          <Radio
            id={'1'}
            name={'device-radio'}
            title={'1'}
            onClick={setDevice}
          />
        </li>
        <li className='device__item'>
          <Radio
            id={'2'}
            name={'device-radio'}
            title={'2'}
            onClick={setDevice}
          />
        </li>
        <li className='device__item'>
          <Radio
            id={'3'}
            name={'device-radio'}
            title={'3'}
            onClick={setDevice}
          />
        </li>
        <li className='device__item'>
          <Radio
            id={'4'}
            name={'device-radio'}
            title={'4'}
            onClick={setDevice}
          />
        </li>
      </ul>
      <ul className='remote__list remote-buttons'>
        <li className='remote__item'></li>
        <li className='remote__item'>
          <ButtonAction
            btn={btn.rew}
            action={onClick}
            device={device}
            motor={'1'}
            dir={'0'}

          />
        </li>
        <li className='remote__item'></li>
        <li className='remote__item'>
          <ButtonAction
            btn={btn.ccw}
            action={onClick}
            device={device}
            motor={'2'}
            dir={'0'}
          />
        </li>
        <li className='remote__item'></li>
        <li className='remote__item'>
          <ButtonAction
            btn={btn.cw}
            action={onClick}
            device={device}
            motor={'2'}
            dir={'1'}
          />
        </li>
        <li className='remote__item'></li>
        <li className='remote__item'>
          <ButtonAction
            btn={btn.fwd}
            action={onClick}
            device={device}
            motor={'1'}
            dir={'1'}
          />
        </li>
        <li className='remote__item'></li>
      </ul>
    </div>
  );
}

export default Remote;
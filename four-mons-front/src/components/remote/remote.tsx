import './remote.css';
import Button from '../button/button';
import {CbType} from '../../types/types';
import {btn} from '../../common/const';

type RemotePropsType = {
  onClick: CbType;
}


function Remote ({onClick}: RemotePropsType):JSX.Element {
  return (
    <div className='remote'>
      {/*<div className='remote__display-wrapper'>*/}
      {/*  <span className='remote__display'>16000</span>*/}
      {/*</div>*/}
      {/*<div className='remote__display-wrapper'>*/}
      {/*  <span className='remote__display'>Parking</span>*/}
      {/*</div>*/}
      <ul className='remote__list device-selector'>
        <li className='remote__item device-selector__button'>
          <Button btn={btn.set1} onClick={onClick}></Button>
        </li>
        <li className='remote__item device-selector__button'>
          <Button btn={btn.set2} onClick={onClick}></Button>
        </li>
        <li className='remote__item device-selector__button'>
          <Button btn={btn.set3} onClick={onClick}></Button>
        </li>
        <li className='remote__item device-selector__button'>
          <Button btn={btn.set4} onClick={onClick}></Button>
        </li>
      </ul>
      <ul className='remote__list remote-buttons'>
        <li className='remote__item'></li>
        <li className='remote__item'>
          <Button btn={btn.rew} onClick={onClick}></Button>
        </li>
        <li className='remote__item'></li>
        <li className='remote__item'>
          <Button btn={btn.ccw} onClick={onClick}></Button>
        </li>
        <li className='remote__item'></li>
        <li className='remote__item'>
          <Button btn={btn.cw} onClick={onClick}></Button>
        </li>
        <li className='remote__item'></li>
        <li className='remote__item'>
          <Button btn={btn.fwd} onClick={onClick}></Button>
        </li>
        <li className='remote__item'></li>
      </ul>
    </div>
  );
}

export default Remote;
import './setting-Input.css';
import { InputType } from "../../common/const";
import {correctValue} from '../../common/correct-value';
import {CbType} from '../../types/types';
import {ChangeEvent} from 'react';

type FieldsetPropsType = {
  onChange: CbType;
  settingType: InputType;
  setting: any
}


function SettingInput ({settingType, setting, onChange}: FieldsetPropsType):JSX.Element {

  const HandleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const correctedValue = correctValue(evt.target.value);
    onChange({...setting, [settingType]: correctedValue}, '');
  }

  return (
    <>
      <label className="setting__input-label" htmlFor={settingType}>
        <span className='setting__input-text'>{settingType}</span>
      </label>
      <input className='setting__input' type='text' id={settingType} value={setting[settingType]} onChange={HandleOnChange}/>
    </>
  )
}

export default SettingInput;
import './setting.css';
import Button from '../button/button';
import {btn, SETTINGS} from '../../common/const';
import Fieldset from '../setting-Input/setting-Input';
import {CbSaveSettingType, CbType} from '../../types/types';

type SettingPropsType = {
  onClick: CbType;
  onChange: CbSaveSettingType;
  setting: any;
}

function Setting ({onClick, setting, onChange}:SettingPropsType):JSX.Element {
  return (
    <div className='setting main__setting'>

      {SETTINGS.map((settingType)=> (
        <Fieldset key={settingType} settingType={settingType} setting={setting} onChange={onChange}/>
      ))}

      <Button btn={btn.resetSetting} onClick={onClick}/>
      <Button btn={btn.setFlour} onClick={onClick}/>
    </div>
  )
}

export default Setting;
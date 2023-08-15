import './setting.css';
import Button from '../button/button';
import {btn, SETTINGS} from '../../common/const';
import SettingInput from '../setting-Input/setting-Input';

type SettingPropsType = {
  resetSetting: () => void,
  setSetting: (setting: any)=> void,
  setFlour: (setting: any)=> void,
  setting: any;
}

function Setting ({setting, setSetting, setFlour, resetSetting}:SettingPropsType):JSX.Element {
  return (
    <div className='setting main__setting'>

      {SETTINGS.map((settingType)=> (
        <SettingInput key={settingType} settingType={settingType} setting={setting} onChange={setSetting}/>
      ))}

      <Button btn={btn.resetSetting} action={resetSetting}/>
      <Button btn={btn.setFlour} action={setFlour}/>
    </div>
  )
}

export default Setting;
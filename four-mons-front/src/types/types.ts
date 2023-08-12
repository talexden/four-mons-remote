import {Command} from '../common/const';

export type CbType = (title: string, command: string)=> void;
export type CbSaveSettingType = (setting: any)=> void;


export type ButtonType =  {className: string, title: string, command: Command};

export type BntType = {
  [keys in Command]: ButtonType;
}

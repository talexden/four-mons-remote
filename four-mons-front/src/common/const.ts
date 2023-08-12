import {BntType} from '../types/types';

export enum InputType {
  Group = 'group',
  title = 'title',
  Ip = 'ip',
  SpeedUp = 'speedUp',
  Speeds = 'speeds',
  Parking = 'parking',
  Top = 'top',
  Bottom = 'bottom'
}

export const SETTINGS = [
  // InputType.Group,
  InputType.title,
  InputType.Ip,
  // InputType.SpeedUp,
  // InputType.Speeds,
  InputType.Parking,
  InputType.Top,
  InputType.Bottom
]

export enum Command {
  SaveSetting = 'saveSetting',
  ResetSetting = 'resetSetting',
  SetFlour = 'setFlour',
  LoadSetting ='loadSetting',
  Remote ='remote',
  Set1 = 'set1',
  Set2 = 'set2',
  Set3 = 'set3',
  Set4 = 'set4',
  Stop = 'stop',
  Pause = 'pause',
  Fwd = 'fwd',
  Rew = 'rew',
  Cw = 'cw',
  Ccw = 'ccw',
  Parking ='parking',
  ParkingAll ='parkingAll',
  FooterDisplay = 'footerDisplay',
}

export const btn: Readonly<BntType> = {
  [Command.SaveSetting]: {className: 'button__submit', title: 'save setting', command: Command.SaveSetting},
  [Command.ResetSetting]: {className: 'button__reset', title: 'reset', command: Command.ResetSetting},
  [Command.SetFlour]: {className: 'button__set-flour', title: 'set flour', command: Command.SetFlour},
  [Command.LoadSetting]: {className: 'button__setup', title: 'setup', command: Command.LoadSetting},
  [Command.Remote]: {className: 'button__remote', title: 'remote', command: Command.Remote},
  [Command.Set1]: {className: 'remote__button', title: '1', command: Command.Set1},
  [Command.Set2]: {className: 'remote__button', title: '2', command: Command.Set2},
  [Command.Set3]: {className: 'remote__button', title: '3', command: Command.Set3},
  [Command.Set4]: {className: 'remote__button', title: '4', command: Command.Set4},
  [Command.Stop]: {className: 'remote__button', title: 'stop', command: Command.Stop},
  [Command.Pause]: {className: 'remote__button', title: 'pause', command: Command.Pause},
  [Command.Fwd]: {className: 'remote__button', title: 'frw', command: Command.Fwd},
  [Command.Rew]: {className: 'remote__button', title: 'rew', command: Command.Rew},
  [Command.Cw]: {className: 'remote__button', title: 'cw', command: Command.Cw},
  [Command.Ccw]: {className: 'remote__button', title: 'ccw', command: Command.Ccw},
  [Command.Parking]: {className: 'remote__button', title: 'parking', command: Command.Parking},
  [Command.ParkingAll]: {className: 'remote__button', title: 'park all', command: Command.ParkingAll},
  [Command.FooterDisplay]: {className: "footer__button-display", title: 'Parking - hold 3sec. Park All - hold 7 sec', command: Command.FooterDisplay},
};
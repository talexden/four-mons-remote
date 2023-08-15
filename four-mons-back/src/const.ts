// export enum Command {
//   SaveSetting = 'saveSetting',
//   ResetSetting = 'resetSetting',
//   SetFlour = 'setFlour', // запись высоты от сцены до парковки
//   LoadSetting ='loadSetting',
//   Remote ='remote',
//   Stop = 'stop',
//   Pause = 'pause',
//   GoTo = 'goToPosition',
//   GoTop = 'goTop',
//   GoBottom = 'GoBottom',
//   Up = 'goUp',
//   Down = 'goDown',
//   Parking ='parking',
//   IncM = 'incM',
//   IncSm = 'incSm',
//   DecM = 'decM',
//   DecSm = 'decSm',
//   FooterDisplay = 'footerDisplay',
//   Reboot = 'reboot',
//   Reset = 'reset', // перезаписть файла настроек файлом init, перезагрузка.
// }

export enum Command {
  ArduinoCommand = 'arduinoCommand',
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

export enum Path {
  SettingInit = '../data/lift-setting-init.json',
  Setting = '../data/lift-setting.json',
  WebPath = '../dist',
  Base = '../data/',
  Logs = `../data/logs`,
}

export enum LogName {
  Base = 'log',
  Ext = 'json',
  Sep = '.',
}

export enum DirName {
  Base = 'logs',
  Ext = 'dir',
  Sep = '-',
}

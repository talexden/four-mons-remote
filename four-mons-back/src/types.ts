import {Command, DirName, LogName} from './const';

export type WsMsgBodyType = {[key: string]: string | Command };

export type WsMsgTypeType =  Command;

export type WsMessage = {
  type: WsMsgTypeType,
  body: WsMsgBodyType
}


export type CallbackType = (data?: WsMsgBodyType) => void;
export type CallbacksType = {
  [key: string]: CallbackType,
};

export type NameType = {
  Base: LogName.Base | DirName,
  Ext: LogName.Ext | DirName.Ext,
  Sep: LogName.Sep | DirName.Sep,
}
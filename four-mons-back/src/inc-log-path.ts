import * as fs from 'node:fs';
import {NameType} from './types';
import {DirName, LogName} from './const';

const getLastFileIdx = (path: string, names: NameType) => {
  let idx: number|null = null;
  const dirs = fs.readdirSync(path, 'utf8');
  dirs.forEach((name) => {
    const nameParts = name.split(names.Sep);
    const index = Number(nameParts[1]);
    if (nameParts[0] === names.Base && nameParts[2] === names.Ext && Number.isInteger(index) && index >= Number(idx)) {
      idx = index;
    }
  })

  return idx;
};


const getFullName = (name: NameType, idx: number) => `${name.Base}${name.Sep}${idx}${name.Sep}${name.Ext}`;


export const incLogPath = (path: string) => {
  let lastDirIdx = getLastFileIdx(path, DirName);
  let lastLogIdx = 0;
  if (lastDirIdx) {
    lastLogIdx = Number(getLastFileIdx(`${path}/${getFullName(DirName, lastDirIdx)}`, LogName));
  }
  const newDirPath = `${path}/${getFullName(DirName, Number(lastDirIdx) + 1)}`;
  fs.mkdirSync(newDirPath);

  return () => `${newDirPath}/${getFullName(LogName, ++lastLogIdx)}`;
};

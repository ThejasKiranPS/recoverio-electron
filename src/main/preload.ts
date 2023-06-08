// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer } from 'electron';

export type Channels = 'ipc-example';

const electronApi = {
  listDisks: () => ipcRenderer.invoke('list-disks'),
  startScan: (values) => ipcRenderer.send('start-scan', values),
  listRecoveredFiles: () => ipcRenderer.invoke('list-recovered-files'),
  openFile: (path) => ipcRenderer.send('open-file', path),
  formatDisk: (values) => ipcRenderer.send('format-disk', values),
  killAllRecoverIO: () => ipcRenderer.send('kill-all-recoverio'),
};

contextBridge.exposeInMainWorld('eapi', electronApi);

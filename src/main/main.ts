/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */

const { app, BrowserWindow, shell, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const sudo = require('sudo-prompt');
const spawn = require('await-spawn');
const { resolveHtmlPath } = require('./util');
const kill = require('tree-kill');
// const MenuBuilder = require('./menu');

let mainWindow: BrowserWindow | null = null;

let currentRunningProcess = null;
const listDisks = async () => {
  console.log('gotit');
  // execute ls -l and get the output
  const op = await spawn('lsblk', ['-d', '-n']);
  const disks = op
    .toString()
    .split('\n')
    .slice(0, -1)
    .map((s) => s.split(' ')[0]);
  return disks.map((d) => `/dev/${d}`);
};
const sudoPromptOptions = {
  name: 'Recoverio',
  icon: '../../assets/icon.png',
};

const startScan = async (event, { disk, filesystem, fileType, outputDir }) => {
  console.log('startScan');
  if (!outputDir) {
    outputDir = '/tmp/recoverio.out';
    sudo.exec(`rm -rf ${outputDir}`, sudoPromptOptions);
  }

  const cwd = process.cwd();

  currentRunningProcess = sudo.exec(
    `${cwd}/recover.io/target/release/recoverio -d ${disk} recover -f ${fileType} -o ${outputDir}`,
    sudoPromptOptions,
    (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
    }
  );
  console.log(currentRunningProcess);
};

const openFile = async (event, path) => {
  exec(`xdg-open ${path}`, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
  });
};

const listRecoveredFiles = async () => {
  try {
    const op = await spawn('ls', ['/tmp/recoverio.out']);
    const files = op.toString().split('\n').slice(0, -1);
    return files;
  } catch (e) {
    return [];
  }
};

const formatDisk = async (event, { disk }) => {
  console.log('formatDisk ', disk);
  const cwd = process.cwd();

  sudo.exec(
    `${cwd}/recover.io/target/release/recoverio -d ${disk} format --talk-to-the-hand`,
    sudoPromptOptions,
    (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
    }
  );
};

const killAllRecoverIO = async (event) => {
  console.log('killAllRecoverIO');
  sudo.exec(
    `for pid in $(ps -ef | grep "release/recoverio" | grep -v "grep" | awk '{print $2}'); do kill -9 $pid;done`,
    sudoPromptOptions,
    (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      console.log(err);
    }
  );
};

ipcMain.handle('list-disks', listDisks);
ipcMain.on('start-scan', startScan);
ipcMain.handle('list-recovered-files', listRecoveredFiles);
ipcMain.on('open-file', openFile);
ipcMain.on('format-disk', formatDisk);
ipcMain.on('kill-all-recoverio', killAllRecoverIO);

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      //      devTools: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
    autoHideMenuBar: true,
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

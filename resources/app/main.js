const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

let win;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width: 300,
    height: 280,
    x: width - 320,
    y: height - 320,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    hasShadow: false,
    roundedCorners: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'src', 'icon.png')
  });

  win.loadFile(path.join(__dirname, 'src', 'index.html'));
  win.setAlwaysOnTop(true, 'floating');
  win.setVisibleOnAllWorkspaces(true);

  win.on('closed', () => { win = null; });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('close-app', () => app.quit());
ipcMain.on('resize-window', (e, h) => {
  if (win) {
    const bounds = win.getBounds();
    win.setBounds({ ...bounds, height: Math.max(160, Math.min(600, h)) });
  }
});

const { ipcRenderer } = require('electron');
window.closeApp = () => ipcRenderer.send('close-app');
window.resizeWindow = (h) => ipcRenderer.send('resize-window', h);

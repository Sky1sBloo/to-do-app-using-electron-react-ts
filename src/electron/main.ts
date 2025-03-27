import { app, BrowserWindow } from 'electron';
import { isDev } from './util.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
import { runApplication } from './application.js';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
            sandbox: true
        }
    });
    if (isDev()) {
        mainWindow.loadURL("http://localhost:2325");
    } else {
        mainWindow.loadFile(getUIPath());
    }

    runApplication();
});

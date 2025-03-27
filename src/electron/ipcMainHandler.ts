/**
 * Wrapper for ipcMain for typed declarations on functionTypes
 * Use this rather than calling ipcMain functions directly
 */
import { ipcMain, WebContents, WebFrameMain } from "electron";
import { pathToFileURL } from 'url';
import { isDev } from "./util.js";
import { getUIPath } from "./pathResolver.js";

export const ipcMainOn = <Channel extends keyof IPC_Channels>(
    channel: Channel, callback: (payload: IPC_Channels[Channel]) => void) => {
    ipcMain.on(channel, (event, args) => {
        validateEventFrame(event.senderFrame);
        callback(args);
    });
}

export const ipcMainHandle = <Channel extends keyof IPC_ReceiveSendChannels>(
    channel: Channel, handler: (payload: IPC_ReceiveSendChannels[Channel]['receiveParam']) =>
        Promise<IPC_ReceiveSendChannels[Channel]['sendParam']> | unknown) => {
    ipcMain.handle(channel, (event, payload) => {
        validateEventFrame(event.senderFrame);
        return handler(payload);
    });
}

export const ipcWebContentsSend = <Channel extends keyof IPC_Channels>(
    channel: Channel, webContents: WebContents, payload: IPC_Channels[Channel]) => {
    webContents.send(channel, payload);
}

/**
 * Ensures that the event frame is from UI port/url
 */
export const validateEventFrame = (frame: WebFrameMain | null) => {
    if (frame == null) {
        throw new Error("Event frame is null");
    }

    if (isDev() && new URL(frame.url).host === 'localhost:2325') {
        return;
    }
    if (frame.url !== pathToFileURL(getUIPath()).toString()) {
        throw new Error('Event frame comes from invalid source');
    }
}

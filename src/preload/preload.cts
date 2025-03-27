import electron from 'electron';

electron.contextBridge.exposeInMainWorld('electron', {
    addTask: async (newTask: string): Promise<string[]> => {
        return ipcRendererInvoke('addTaskEvent', newTask);
    },
    removeTask: async (taskToRemove: string): Promise<string[]> => {
        return ipcRendererInvoke('removeTaskEvent', taskToRemove);
    }
} satisfies Window['electron']);

/// Wrappers for IPC Functions below
export const ipcRendererInvoke = <Channel extends keyof IPC_ReceiveSendChannels>(
    channel: Channel, payload: IPC_ReceiveSendChannels[Channel]['receiveParam']): Promise<IPC_ReceiveSendChannels[Channel]['sendParam']> => {
    return electron.ipcRenderer.invoke(channel, payload);
}

export const ipcRendererOn = <Channel extends keyof IPC_Channels>(
    channel: Channel,
    callback: (payload: IPC_Channels[Channel]) => void) => {
    const rendererCallback = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
    electron.ipcRenderer.on(channel, rendererCallback);
    return () => electron.ipcRenderer.off(channel, rendererCallback);
}

export const ipcRendererSend = <Channel extends keyof IPC_Channels>(
    channel: Channel,
    payload: IPC_Channels[Channel]
) => {
    electron.ipcRenderer.send(channel, payload);
}

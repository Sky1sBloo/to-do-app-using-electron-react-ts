// List types that should be exposed to both frontend and backend

interface Window {
    // Anything inside here will be exposed to the frontend
    // see: preload.cts for type information
    electron: {
        addTask: (newTask: string) => Promise<string[]>;
        removeTask: (taskToRemove: string) => Promise<string[]>;
    }
}

/**
 * List of IPC Channels with their datatype for one way
 */
type IPC_Channels = {
    addTaskEvent: string;
};

/**
 * List of IPC Channels with two way communication
 */
type IPC_ReceiveSendChannels = {
    addTaskEvent: ReceiveSendEvent<string, string[]>;
    removeTaskEvent: ReceiveSendEvent<string, string[]>;
}

type ReceiveSendEvent<TRequest, TReceive> = {
    receiveParam: TRequest;
    sendParam: TReceive;
};

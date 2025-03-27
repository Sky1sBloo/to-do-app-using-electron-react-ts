import { pathToFileURL } from 'url';
import { getUIPath } from "./pathResolver.js";
import { WebFrameMain } from 'electron';

export function isDev(): boolean {
    return process.env.NODE_ENV === 'development';
}

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

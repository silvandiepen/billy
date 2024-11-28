import {
	EventAction,
	EventChannel,
	type EventData,
} from '@/components/Events/Events.model';

export const onKey = (key: string, callback: () => void) => {
	eventBus.on(EventChannel.UI, (p: any) => {
		const { data, action } = p as unknown as EventData;
		if (action == EventAction.KEY) {
			if (data.key == key) {
				callback();
			}
		}
	});
};

export const onKeyEvent = (key: string, callback: (data: any) => void) => {
	document.addEventListener('keydown', (e) => {
		if (e.key == key) {
			callback(e);
		}
	});
};

export const onEscape = (callback: () => void) => onKey('Escape', callback);
export const onEnter = (callback: () => void) => onKey('Enter', callback);
export const onNext = (callback: () => void) => onKey('ArrowRight', callback);
// export const onPrevious = (callback: () => void) => onKey("ArrowLeft", callback);
export const onTab = (callback: () => void) => onKey('Tab', callback);
export const onShiftTab = (callback: () => void) => onKey('ShiftTab', callback);
export const onSpace = (callback: () => void) => onKey(' ', callback);

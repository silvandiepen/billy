export const EventChannel = {
	UI: 'UI',
	DATA: 'data',
	FORM: 'form'
};
export type EventChannel = (typeof EventChannel)[keyof typeof EventChannel];

export const EventAction = {
	REMOVE: 'REMOVE',
	ADD: 'ADD',
	KEY: 'KEY',
	OPEN: 'OPEN',
	CLOSE: 'CLOSE',
	FORCE_CLOSE: 'FORCE_CLOSE',
	FOCUS: 'FOCUS',
	HIDE: 'HIDE',
	SHOW: 'SHOW',
	TOGGLE: 'TOGGLE',
	LOCK: 'LOCK',
	GO: 'GO',
	DRAG: 'DRAG',
	NEW: 'NEW',
};
export type EventAction = (typeof EventAction)[keyof typeof EventAction];

export interface EventData {
	action: EventAction;
	data: {
		[key: string]: any;
	};
}

export const EventKeys = {
	ESCAPE: 'Escape',
	ENTER: 'Enter',
	BACKSPACE: 'Backspace',
	DELETE: 'Delete',
	KEY_UP: 'ArrowUp',
	KEY_DOWN: 'ArrowDown',
	KEY_LEFT: 'ArrowLeft',
	KEY_RIGHT: 'ArrowRight',
	KEY_U: 'KeyU',
};
export type EventKeys = (typeof EventKeys)[keyof typeof EventKeys];

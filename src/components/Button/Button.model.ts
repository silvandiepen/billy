import { Icons } from 'open-icon';
import { AllColors, Size, Status } from '@/types';

export const ButtonSize = Size;
export type ButtonSize = (typeof Size)[keyof typeof Size];

export const ButtonColor = AllColors;
export type ButtonColor = (typeof ButtonColor)[keyof typeof ButtonColor];

export const ButtonType = {
	DEFAULT: 'default',
	NORMAL: 'normal',
	ICON_ONLY: 'icon-only',
	GHOST: 'ghost',
	OUTLINE: 'outline',
};
export type ButtonType = (typeof ButtonType)[keyof typeof ButtonType];

export const ButtonStatus = Status;
export type ButtonStatus = (typeof Status)[keyof typeof Status];

export const ButtonSettings = {
	Color: ButtonColor,
	Size: ButtonSize,
	Type: ButtonType,
	Icon: Icons,
	Status: ButtonStatus,
};

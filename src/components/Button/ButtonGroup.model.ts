export const ButtonGroupAlign = {
	LEFT: 'left',
	CENTER: 'center',
	RIGHT: 'right',
};
export type ButtonGroupAlign =
  (typeof ButtonGroupAlign)[keyof typeof ButtonGroupAlign];

export const ButtonGroupDirection = {
	HORIZONTAL: 'horizontal',
	VERTICAL: 'vertical',
};
export type ButtonGroupDirection =
  (typeof ButtonGroupDirection)[keyof typeof ButtonGroupDirection];

export const ButtonGroupType = {
	STACK: 'stack',
	NORMAL: 'normal',
};
export type ButtonGroupType =
  (typeof ButtonGroupType)[keyof typeof ButtonGroupType];

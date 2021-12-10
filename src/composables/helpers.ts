export const bem = (
  block: string,
  element: string = "",
  modifier: string = ""
) => {
  let className = `${block}`;

  if (element) className = `${className}__${element}`;
  if (modifier) className = `${className}--${modifier}`;

  return className;
};

export const newId = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return `${s4()}-${s4()}-${s4()}-${s4()}`;
};

export const equalObjects = (obj1: Object, obj2: Object): boolean =>
  Object.values(obj1) === Object.values(obj2);

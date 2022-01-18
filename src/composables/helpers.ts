import { format, parseISO } from "date-fns";

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

export const formatDate = (date: Date, template = "yyyy-MM-dd") => {
  return ``;
  // return format(parseISO(`${date}`), template);
};
export const downloadFile = (fileName: string, fileData: string): void => {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(fileData)
  );
  element.setAttribute("download", fileName);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

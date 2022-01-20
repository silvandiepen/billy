import { createVNode, render, Component, App, VNode, VNodeChild } from "vue";

export interface MountResult {
  vNode: VNode;
  el: HTMLElement | undefined;
  destroy: () => void;
}

interface MountArguments {
  props?: Object;
  children?: VNodeChild[];
  app?: App;
  element?: HTMLElement;
}

export const mount = (
  component: Component,
  { props, children, element, app }: MountArguments = {}
): MountResult => {
  let el = element;

  let vNode: VNode | undefined = createVNode(component, props, children);

  //   vNode.destroy = () => {
  //     if (el) render(null, el);
  //     el = undefined;
  //     vNode = undefined;
  //   };

  if (app?._context) vNode.appContext = app._context;
  if (el) render(vNode, el);
  else if (typeof document !== "undefined")
    render(vNode, (el = document.createElement("div")));

  const destroy = () => {
    console.log("trying to destroy this");
    if (el) render(null, el);
    el = undefined;
    vNode = undefined;
  };

  return { vNode, destroy, el };
};

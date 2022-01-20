import { createApp } from "vue";

export default function renderComponent({ component, props, appContext }: any) {
  console.log(appContext, component, props);

  //   let tempApp = createApp(component, props);
  //   Object.assign(tempApp._context, appContext); // must use Object.assign on _context

  //   const el = document.body.querySelector("#modals");

  //   if (el) tempApp.mount(el);

  //   console.log(appContext);

  //   return () => {
  //     // destroy app/component
  //     tempApp?.unmount();
  //     // app = undefined;
  //   };
}

import { watch } from "@vue-reactivity/watch";
import { StorageAction, StorageOptions, defaultOptions } from "./storage.model";

export const retrieveState = async (
  defaultState: Object,
  key: string,
  options: Partial<StorageOptions> = {}
): Promise<any> => {
  if (!localStorage) return;

  const opts = {
    ...defaultOptions,
    ...options,
  };

  const store = localStorage.getItem(key);

  opts.verbose && console.log(`RECOVERED ::: ${key}`);

  const state = {
    ...defaultState,
    ...JSON.parse(store || "{}").data,
  };
  opts.callback({ action: StorageAction.RETRIEVE, state, key });
  return state;
};

export const watchState = (
  state: Object,
  key: string,
  options: Partial<StorageOptions> = {}
) => {
  if (!localStorage) return;

  const opts = {
    ...defaultOptions,
    ...options,
  };

  opts.verbose && console.log(`WATCHING ::: ${key}`);

  watch(
    () => state,
    (from, to) => {
      setTimeout(() => {
        saveState(state, key);
        opts.callback({ action: StorageAction.WATCH, state, key, from, to });
      }, 0);
    },
    { deep: true }
  );
};

export const saveState = (
  state: Object,
  key: string,
  options: Partial<StorageOptions> = {}
) => {
  if (!localStorage) return;
  
  const opts = {
    ...defaultOptions,
    ...options,
  };

  opts.verbose && console.log(`SAVED ::: ${key}`);

  const store = {
    latestUpdate: new Date().getTime(),
    data: state,
  };
  localStorage.setItem(key, JSON.stringify(store));
  opts.callback({ action: StorageAction.SAVE, state, key });
};

export const clearState = (
  key: string,
  options: Partial<StorageOptions> = {}
) => {
  if (!localStorage) return;

  const opts = {
    ...defaultOptions,
    ...options,
  };

  opts.verbose && console.log(`SAVED ::: ${key}`);

  localStorage.removeItem(key);
  location.reload();
  opts.callback({ action: StorageAction.CLEAR, key });
};

export enum StorageAction {
    WATCH = "watch",
    RETRIEVE = "retrieve",
    SAVE = "save",
    CLEAR = "clear",
  }
  
  export interface StorageOptions {
    debug: boolean;
    verbose: boolean;
    callback: (args: {
      action: StorageAction;
      state?: Object;
      key?: string;
      from?: Object;
      to?: Object;
    }) => void;
  }
  
  export const defaultOptions: StorageOptions = {
    debug: false,
    verbose: false,
    callback: () => {},
  };
export interface ModalProps {
  identifier: string;
  active: boolean;
}

export enum ModalAction {
  OPEN = "[Modal] open",
  CLOSE = "[Modal] close",
  TOGGLE = "[Modal] toggle",
}

export interface ModalEventArguments {
  identifier: string;
  active: boolean;
  action: ModalAction;
}

export enum ModalIdentifier {
  CLIENT_FORM = "[Modal] ClientForm",
  CLIENTS_LIST = "[Modal] ClientsList",
  SELLER_FORM = "[Modal] SellerForm",
  SELLERS_LIST = "[Modal] SellersList",
}

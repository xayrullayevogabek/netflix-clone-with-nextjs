export interface ContextType {
  account: AccountProps | null;
  setAccount: Dispatch<SetStateAction<AccountProps | null>>;
  pageLoader: boolean;
  setPageLoader: Dispatch<SetStateAction<boolean>>;
}

export interface AccountProps {
  _id: string;
  uid: string;
  name: string;
  pin: string;
}
export interface ChildProps {
  children: React.ReactNode;
}

export interface MenuItemProps {
  id: string;
  title: string;
  path: string;
}

export interface AxiosResponse {
  success: boolean;
  message?: string;
}

export interface AccountResponse extends AxiosResponse {
  accounts: AccountProps[] | AccountProps;
}

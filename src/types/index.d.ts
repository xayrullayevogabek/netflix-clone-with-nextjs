export interface ContextType {
  account: AccountProps | null;
  setAccount: Dispatch<SetStateAction<AccountProps | null>>;
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

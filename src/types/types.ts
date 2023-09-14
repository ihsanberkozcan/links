export type Links= {
  urlDesc: string;
  url: string;
  clickNumber: number;
};
export type MyObjectType = {
  links: Links[];
};
export type datatype = {
  username?: string;
  desc?: string;
  img?: string;
  links?: Links[];
};
export type userdatatype = {
  username: string;
  desc?: string;
};

export type provideType = {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: string;
  };
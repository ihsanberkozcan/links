export type Links= {
  _id?: any | undefined;
  urlDesc: string;
  url: string;
  clickNumber: number;
};
export type MyObjectType = {
  links?: Links[];
};
export type datatype = {
  username?: string;
  desc?: string;
  img?: string;
  borderRadius?: string;
  links?: Links[];
  linksBackgroundColor?: string
  descriptionTextColor?: string
  linksTextColor?: string
  pageBackgroundColor?: string

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
export interface RelationMenu{
  component: string;
  id: string;
  meta: {
    activeMenu: string | null;
    alwaysShow: boolean;
    hidden: boolean;
    icon: string | null;
    noCache: boolean;
    title: string;
  };
  name: string;
  path: string;
  pid: string;
  redirect: string | null;
  sort: number;
  children?: RelationMenu[];
}

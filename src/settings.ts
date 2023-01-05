interface DefaultSettings {
  title: string;
  sideTheme: string;
  showSettings: boolean;
  topNav: boolean;
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
  dynamicTitle: boolean;
  errorLog: string;
}

const defaultSettings: DefaultSettings = {
  title: import.meta.env.VITE_APP_TITLE,
  sideTheme: "theme-dark",
  showSettings: true,
  topNav: false,
  tagsView: false,
  fixedHeader: true,
  sidebarLogo: true,
  dynamicTitle: true,
  errorLog: "production"
}

export default defaultSettings

// 登录表单类型声明
export interface LoginFormData {
  username: string;
  password: string;
  captcha: string
}

// 登录响应类型声明
export interface LoginResponseData {
  token: string
}

// 登录用户基本信息类型声明
export interface LoginUserBaseInfoData {
  avatar: string;
  password?: string;
  introduction: string;
  loginName: string;
  realname: string;
  roleId: string;
  roleName: string
}

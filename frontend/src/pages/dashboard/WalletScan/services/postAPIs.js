import axios from "axios";
import Axios from "axios";

export const login = (email, password) => {
  return axios.post(`https://gxauth.apimachine.com/gx/user/auth/login`, {
    email: email,
    password: password,
  });
};

export const getCoinsForApp = (app) => {
  return axios.post(
    `https://comms.globalxchange.io/coin/vault/service/coins/get`,
    {
      app_code: app,
    }
  );
};

export const _2FALogin = (data) => {
  return axios.post(`https://gxauth.apimachine.com/gx/user/auth/login/challenge`, { ...data });
};

export const liquidAssetList = (data) => {
  return axios.post(
    `https://comms.globalxchange.io/coin/vault/service/txns/get`,
    { ...data }
  );
};

export const authenticate = () => {
  let email = localStorage.getItem("bankerEmailNew");
  let token = localStorage.getItem("TokenId");

  return axios.post(`https://comms.globalxchange.io/coin/verifyToken`, {
    email: email,
    token: token,
  });
};
export const forgetPasswordRequest = (email) => {
  let config = {
    method: "post",
    url: `https://gxauth.apimachine.com/gx/user/password/forgot/request`,
    data: {
      email: email,
    },
  };
  return axios(config);
};
export const resetPassword = (details) => {
  let config = {
    method: "post",
    url: `https://gxauth.apimachine.com/gx/user/password/forgot/confirm`,
    data: {
      email: details.email,
      code: details.code,
      newPassword: details.newPassword,
    },
  };
  return Axios(config);
};
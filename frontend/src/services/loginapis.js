import axios from "axios";

//Login API

export const Loginservice = (object) => {
  try {
    const response = axios.post(
      `https://gxauth.apimachine.com/gx/user/auth/login`,
      object
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const RegisterOnApp = async (object) => {
  try {
    const response = await axios.post(
      "https://comms.globalxchange.io/gxb/apps/register/user",
      object
    );
    return response;
  } catch (error) {
    return error;
  }
};

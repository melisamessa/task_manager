import axiosClient from "../../../api/AxiosClient";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosClient.post("/auth/register", userData);
    const token = response.data.split(" ")[1];
    localStorage.setItem("token", token);
    return token;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Error desconocido al registrar el usuario.");
    }
  }
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosClient.post("/auth/login", userData);
    const token = response.data.split(" ")[1];
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    throw new Error("Error al iniciar sesión.");
  }
};

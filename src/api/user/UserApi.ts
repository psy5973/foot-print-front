import { axiosController } from "../common/AxiosController";

const url = "/api/users";

const signUp = (data: SignUpRequest) => {
  return axiosController.post<SignUpRequest>(`${url}/signup`, data);
};

export { signUp };

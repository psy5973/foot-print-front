import { AxiosController } from "../common/AxiosController";

const url = "/api/users";

const signUp = (data: SignUpRequest) => {
  return AxiosController.post<SignUpRequest>(`${url}/signup`, data);
};

export const UserApi = { signUp };

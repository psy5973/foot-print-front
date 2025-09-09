import type { SignUpRequest } from "../../pages/account/types/types";
import { axiosController } from "../common/axiosController";

const url = "/api/users";

const signUp = (data: SignUpRequest) => {
  return axiosController.post<SignUpRequest>(`${url}/signup`, data);
};

export const accountApi = { signUp };

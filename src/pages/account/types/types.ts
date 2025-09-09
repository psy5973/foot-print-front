import type { Gender } from "./enums";

export interface SignUpRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  userName: string;
  birthDt: string;
  gender: Gender;
}

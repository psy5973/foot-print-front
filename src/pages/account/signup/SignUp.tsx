import { Button, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import SDForm from "../../../common/components/form/SDForm";
import { ColumnType } from "../../../common/components/form/types/enum";
import { accountApi } from "../../../api/accont/accountApi";
import type { FormError } from "../../../common/components/form/types/formTypes";
import { commonFunctions } from "../../../common/functions/commonFunctions";
import { useDebounce } from "../../../common/hooks/useDebounce";
import { accountErrors } from "../../../common/cosntants/errors/accountErrors";
import type { SignUpRequest } from "../types/types";
import { Gender } from "../types/enums";

const SignUp = () => {
  type FormFieldError = {
    [K in keyof SignUpRequest]: FormError;
  };

  const createInitialFormFieldError = <T extends object>(
    fields: (keyof T)[]
  ): { [K in keyof T]: FormError } => {
    return fields.reduce(
      (acc, key) => ({
        ...acc,
        [key]: { isError: false },
      }),
      {} as { [K in keyof T]: FormError }
    );
  };

  const [signUpRequest, setSignUpRequest] = useState<Partial<SignUpRequest>>(
    {}
  );

  const [formFieldError, setFormFieldError] = useState<FormFieldError>(
    createInitialFormFieldError<SignUpRequest>([
      "email",
      "gender",
      "password",
      "passwordConfirm",
      "birthDt",
      "userName",
    ])
  );

  const debounceEmailValue = useDebounce(signUpRequest?.email, 300);
  const debounceUserNameValue = useDebounce(signUpRequest?.userName, 300);

  const handleSubmit = () => {
    const errorField = Object.keys(formFieldError).find(
      (key) => formFieldError[key as keyof FormFieldError]?.isError === true
    );

    if (errorField) {
      return;
    }

    if (!signUpRequest?.gender) {
      setFormFieldError((prev) => ({
        ...prev,
        gender: { isError: true, message: accountErrors.UNSELECTED_GENDER },
      }));
      return;
    }

    accountApi
      .signUp(signUpRequest as SignUpRequest)
      .then((res) => console.log(res));
  };

  const handleValidateUserName = useCallback(() => {
    // Todo: 닉네임 중복확인
    // const dup =
  }, [debounceUserNameValue]);

  const handleValidateEmail = useCallback(() => {
    if (!commonFunctions.isEmailPatternValid(debounceEmailValue as string)) {
      setFormFieldError((prev) => ({
        ...prev,
        email: { isError: true, message: accountErrors.INVALID_EMAIL },
      }));
      return;
    }

    // Todo: 이메일 중복확인
  }, [debounceEmailValue]);

  const handleValidatePassword = useCallback(() => {
    if (
      !commonFunctions.isPasswordPatternValid(signUpRequest?.password as string)
    ) {
      setFormFieldError((prev) => ({
        ...prev,
        password: { isError: true, message: accountErrors.INVALID_PASSWORD },
      }));
    }
  }, [signUpRequest?.password]);

  useEffect(() => {
    handleValidateUserName();
  }, [handleValidateUserName]);

  useEffect(() => {
    handleValidateEmail();
  }, [handleValidateEmail]);

  useEffect(() => {
    handleValidatePassword();
  }, [handleValidatePassword]);
  return (
    <div>
      <Grid container>
        <Grid size={{ xs: 1, lg: 4 }}></Grid>
        <Grid
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
          alignItems={"center"}
          size={{ xs: 10, lg: 4 }}
        >
          <div>
            <SDForm
              onAfterChangeValue={
                (e) =>
                  setFormFieldError((prev) => ({
                    ...prev,
                    [e?.key]: { isError: false, message: null },
                  }))
                // console.log(e)
              }
              data={signUpRequest}
              setData={setSignUpRequest}
              columns={[
                {
                  name: "email",
                  columnType: ColumnType.INPUT,
                  label: "이메일",
                  error: formFieldError?.email,
                  variant: "outlined",
                  placeholder: "이메일 입력",
                  debounce: true,
                },
                {
                  name: "password",
                  columnType: ColumnType.INPUT,
                  label: "비밀번호",
                  error: formFieldError?.password,
                  helperText: formFieldError?.password?.isError
                    ? ""
                    : "특수문자, 대문자, 숫자를 포함한 비밀번호를 입력해주세요",
                  type: "password",
                },
                {
                  name: "passwordConfirm",
                  columnType: ColumnType.INPUT,
                  label: "비밀번호 확인",
                  error: formFieldError?.passwordConfirm,
                  type: "password",
                },
                {
                  name: "gender",
                  columnType: ColumnType.RADIO,
                  label: "성별",
                  error: formFieldError?.gender,
                  options: [
                    { value: Gender.MALE, label: "남" },
                    { value: Gender.FEMALE, label: "여" },
                  ],
                  row: true,
                },

                {
                  name: "userName",
                  columnType: ColumnType.INPUT,
                  label: "닉네임",
                  error: formFieldError?.userName,
                },
              ]}
            />
          </div>
          <div className="mt-20 w-100">
            <Button
              className="w-100"
              variant="contained"
              onClick={() => handleSubmit()}
            >
              회원가입
            </Button>
          </div>
        </Grid>
        <Grid size={{ xs: 1, lg: 4 }}></Grid>
      </Grid>
    </div>
  );
};

export default SignUp;

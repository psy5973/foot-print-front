import { Button, Grid } from "@mui/material";
import { useRef, useState } from "react";
import FPForm from "../../../common/components/form/FPForm";
import { ColumnType } from "../../../common/components/form/types/enum";
import { UserApi } from "../../../api/user/UserApi";
import type { FormError } from "../../../common/components/form/types/formTypes";

const SignUp = () => {
  type FormFieldError = {
    [K in keyof SignUpRequest]: FormError;
  };

  const prevSignUpRequest = useRef<SignUpRequest>(null);

  const [signUpRequest, setSignUpRequest] = useState<SignUpRequest>({});
  const [formFieldError, setFormFieldError] = useState<FormFieldError>({});

  const handleSubmit = () => {
    UserApi.signUp(signUpRequest).then((res) => console.log(res));
  };

  const handleValidateFormField = (key: keyof SignUpRequest) => {
    switch (key) {
      case "email":
      default:
        break;
    }
  };

  // useEffect(() => {
  //   if (prevSignUpRequest.current) {
  //     const changedKeys = Object.keys(signUpRequest).filter(
  //       (key) =>
  //         signUpRequest[key as keyof SignUpRequest] !==
  //         prevSignUpRequest.current![key as keyof SignUpRequest]
  //     );

  //     if (changedKeys.length > 0) {
  //       console.log("변경된 필드:", changedKeys);
  //       handleValidateFormField(changedKeys);
  //     }
  //   }

  //   const changedField = signUpRequest;
  //   handleValidateFormField();
  // }, [signUpRequest]);

  return (
    <div>
      <Grid container>
        <Grid size={{ xs: 1, lg: 4 }}></Grid>
        <Grid
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          size={{ xs: 10, lg: 4 }}
        >
          <div /* style={{ display: "block" }} */>
            <FPForm
              data={signUpRequest}
              setData={setSignUpRequest}
              columns={[
                {
                  name: "email",
                  columnType: ColumnType.INPUT,
                  label: "이메일",
                  error: { isError: true, message: "asdasd" },
                  variant: "outlined",
                  placeholder: "이메일 입력",
                },
                {
                  name: "password",
                  columnType: ColumnType.INPUT,
                  label: "비밀번호",
                  error: formFieldError?.password,
                },
                {
                  name: "passwordConfirm",
                  columnType: ColumnType.INPUT,
                  label: "비밀번호 확인",
                  error: formFieldError?.passwordConfirm,
                },
                {
                  name: "userName",
                  columnType: ColumnType.INPUT,
                  label: "이름",
                  error: formFieldError?.userName,
                },
                {
                  name: "birthDt",
                  columnType: ColumnType.INPUT,
                  label: "생년월일",
                  error: formFieldError?.birthDt,
                },
                {
                  name: "birthDt",
                  columnType: ColumnType.CHECK,
                  label: "생년월일",
                  error: formFieldError?.birthDt,
                  checkLabel: "checkLabelTest",
                },
              ]}
            />
          </div>
          <div style={{ display: "block" }}>
            <Button onClick={() => handleSubmit()}>s</Button>
          </div>
        </Grid>

        <Grid size={{ xs: 1, lg: 4 }}></Grid>
      </Grid>
    </div>
  );
};

export default SignUp;

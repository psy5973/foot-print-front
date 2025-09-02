import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import FPForm from "../../../common/components/form/FPForm";
import { ColumnType } from "../../../common/components/form/types/enum";
import { UserApi } from "../../../api/user/UserApi";
import type { FormError } from "../../../common/components/form/types/formTypes";
import { CommonFunctions } from "../../../common/functions/CommonFunctions";
import { useDebounce } from "../../../common/hooks/useDebounce";

const SignUp = () => {
  type FormFieldError = {
    [K in keyof SignUpRequest]: FormError;
  };

  const [signUpRequest, setSignUpRequest] = useState<SignUpRequest>({});
  const [formFieldError, setFormFieldError] = useState<FormFieldError>({});
  const debounceEmailValue = useDebounce(signUpRequest?.email, 300);

  const handleSubmit = () => {
    UserApi.signUp(signUpRequest).then((res) => console.log(res));
  };

  const handleValidateFormField = (key: keyof SignUpRequest) => {
    switch (key) {
      case "email":
        if (CommonFunctions.regExpEmail(signUpRequest?.email as string)) {
          return;
        }
        setFormFieldError((prev) => ({
          ...prev,
          email: { isError: true, message: "이메일 형식을 확인해주세요." },
        }));
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    // Todo: 이메일 중복확인
    console.log("!!!!!!!!!!!!!");
  }, [debounceEmailValue]);

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
          <div>
            <FPForm
              onAfterChangeValue={(e) => handleValidateFormField(e?.key)}
              data={signUpRequest}
              setData={setSignUpRequest}
              columns={[
                {
                  name: "email",
                  columnType: ColumnType.INPUT,
                  label: "이메일",
                  // error: { isError: true, message: "asdasd" }, // test
                  error: formFieldError?.email,
                  variant: "outlined",
                  placeholder: "이메일 입력",
                },
                {
                  name: "password",
                  columnType: ColumnType.INPUT,
                  label: "비밀번호",
                  error: formFieldError?.password,
                  helperText: "!23",
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

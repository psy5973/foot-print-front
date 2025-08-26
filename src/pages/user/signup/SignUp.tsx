import { Grid } from "@mui/material";
import { useState } from "react";
import FPForm from "../../../common/components/form/FPForm";
import { ColumnType } from "../../../common/components/form/types/enum";

const SignUp = () => {
  const [signUpRequest, setSignUpRequest] = useState<SignUpRequest>({});

  // const handleSubmit = () => {
  //   console.log("1");
  // };

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
          <FPForm
            data={signUpRequest}
            setData={setSignUpRequest}
            columns={[
              {
                name: "email",
                columnType: ColumnType.INPUT,
                label: "email",
                error: { isError: true },
                variant: "outlined",
                placeholder: "123",
              },
              {
                name: "password",
                columnType: ColumnType.INPUT,
                label: "비밀번호",
              },
              {
                name: "passwordConfirm",
                columnType: ColumnType.INPUT,
                label: "비밀번호 확인",
              },
              { name: "userName", columnType: ColumnType.INPUT, label: "이름" },
              {
                name: "birthDt",
                columnType: ColumnType.INPUT,
                label: "생년월일",
              },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 1, lg: 4 }}></Grid>
      </Grid>
    </div>
  );
};

export default SignUp;

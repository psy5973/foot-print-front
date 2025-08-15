import { Grid } from "@mui/material";
import { useState } from "react";
import Form from "../../../common/components/form/FPForm";
import { ColumnType } from "../../../common/components/form/types/enum";

const SignUp = () => {
  const [signUpRequest, setSignUpRequest] = useState<SignUpRequest>({});

  return (
    <Grid container>
      <Grid size={{ xs: 1, lg: 2 }}></Grid>
      <Grid size={{ xs: 10, lg: 8 }}>
        <Form
          data={signUpRequest}
          setData={setSignUpRequest}
          columns={[
            {
              name: "email",
              type: ColumnType.INPUT,
              label: "email",
              error: { isError: false },
            },
            { name: "password", type: ColumnType.INPUT, label: "비밀번호" },
            {
              name: "passwordConfirm",
              type: ColumnType.INPUT,
              label: "비밀번호 확인",
            },
            { name: "userName", type: ColumnType.INPUT, label: "이름" },
            { name: "birthDt", type: ColumnType.INPUT, label: "생년월일" },
          ]}
        />
      </Grid>
      <Grid size={{ xs: 1, lg: 2 }}></Grid>
    </Grid>
  );
};

export default SignUp;

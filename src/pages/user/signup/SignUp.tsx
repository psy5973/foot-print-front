import { Grid } from "@mui/material";
import { useState } from "react";
import Form from "../../../common/components/form/Form";
import { ColumnType } from "../../../common/components/form/types/enum";

const SignUp = () => {
  const [signUpRequest, setSignUpRequest] = useState<SignUpRequest>({});

  return (
    <Grid container>
      <Grid size={{ xs: 12, lg: 12 }}>
        <Form
          data={signUpRequest}
          setData={setSignUpRequest}
          columns={[{ name: "email", type: ColumnType.INPUT }]}
        />
      </Grid>
    </Grid>
  );
};

export default SignUp;

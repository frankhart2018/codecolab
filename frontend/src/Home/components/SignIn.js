import * as React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { email, required } from './form/validation';
import AppForm from './AppForm';
import FormFeedback from './form/FormFeedback';
import FormButton from './form/FormButton';
import { Typography } from '@mui/material';
import RFTextField from './form/RFTextField';
import { useDispatch, useSelector } from "react-redux";
import {loginUserThunk, userDataThunk} from '../../services/thunks';

import { Navigate, useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';


const SignIn = () => {
  const { currentUser } = useSelector((state) => state.userDetails)
  const [sent, setSent] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const validate = (values) => {
    const errors = required(["email", "password"], values);
    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };


  const handleSubmit = async (e) => {
    setSent(true);
    const res = await dispatch(loginUserThunk(e));
    if (res?.payload?.status === "ok") {
      enqueueSnackbar("Login Successful", { variant: "success" });
      navigate("/profile", { replace: true });
      setSent(false);
    }
    else {
      enqueueSnackbar(res?.payload?.message, { variant: "error" });
      setSent(false);
    }
    if (res?.payload?.data) {
      await dispatch(userDataThunk(res?.payload?.data))
    }
  };

  return (
    <React.Fragment>
      {/*<NavBar />*/}
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <Link href="/sign-up" align="center" underline="always">
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
            >
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign In"}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/forgot-password">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
    </React.Fragment>
  );
}

export default SignIn;

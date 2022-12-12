import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import { password, required } from './form/validation';
import NavBar from './NavBar';
import AppForm from './AppForm';
import FormFeedback from './form/FormFeedback';
import FormButton from './form/FormButton';
import { Typography } from '@mui/material';
import RFTextField from './form/RFTextField';
import { useDispatch } from 'react-redux';
import { updatePasswordThunk } from '../../services/thunks';
import { useSnackbar } from "notistack";

function ResetPassword() {
  const { pathname } = useLocation();
  const active = pathname.split("/");
  const id = active[3];
  const token = active[4];
  const [sent, setSent] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const validate = (values) => {
    const errors = required(['password', 'confirmpassword'], values);
    console.log("errors", errors);
    if (!errors.password) {
      const passwordError = password(values.password);
      if (passwordError) {
        errors.password = passwordError;
      }
    }
    if (!errors.confirmpassword) {
      const confirmpasswordError = password(values.confirmpassword);
      if (confirmpasswordError) {
        errors.confirmpassword = confirmpasswordError;
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    console.log(e);
    setSent(true);

    const response = await dispatch(updatePasswordThunk({ password: e.password, id, token }));
    console.log("response", response)
    if (response?.payload?.status === 201) {
      setSent(false);
      enqueueSnackbar(response?.payload?.data?.message, { variant: "success" });
      navigate("/login", { replace: true });
    }
    else {
      enqueueSnackbar(response?.payload?.data?.message, { variant: "error" });
    }
  }
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/reset-password/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log('response', response);
        return response.json();
      })
      .then((data) => {
        console.log("data", data)
        if (data.status === 400) {
          enqueueSnackbar(data?.message, { variant: "error" });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id, token, enqueueSnackbar]);

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Reset password
          </Typography>
          <Typography variant="body2" align="center">
            {"Enter your password below"}
          </Typography>
        </React.Fragment>
        <Form
          id="updatePassword"
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="password"
                label="New Password"
                type="password"
                margin="normal"
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="confirmpassword"
                autoComplete="confirmpassword"
                label="Confirm Password"
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
                {submitting || sent ? 'In progress…' : 'Update Password'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment >
  )

}

export default ResetPassword;

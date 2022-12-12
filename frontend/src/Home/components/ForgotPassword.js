import * as React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import { email, required } from './form/validation';
import NavBar from './NavBar';
import AppForm from './AppForm';
import FormFeedback from './form/FormFeedback';
import FormButton from './form/FormButton';
import { Typography } from '@mui/material';
import RFTextField from './form/RFTextField';
import { useDispatch } from 'react-redux';
import { forgotPasswordThunk } from '../../services/thunks';
import { useSnackbar } from 'notistack';

function ForgotPassword() {
  const [sent, setSent] = React.useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const validate = (values) => {
    const errors = required(['email'], values);

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
    const response = await dispatch(forgotPasswordThunk(e));
    if (response?.payload?.status === 201) {
      enqueueSnackbar(response?.payload?.data?.message, { variant: "success" });
      setSent(false);
    };
    if (response?.payload?.status === 400) {
      enqueueSnackbar(response?.payload?.data?.message, { variant: "error" });
      setSent(false);
    }
  }


  return (

    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Forgot your password?
          </Typography>
          <Typography variant="body2" align="center">
            {"Enter your email address below and we'll " +
              'send you a link to reset your password.'}
          </Typography>
        </React.Fragment>
        <Form
          id="forgotPassword"
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Field
                autoFocus
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
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
                {submitting || sent ? 'In progress…' : 'Send reset link'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment >
  );
}

export default ForgotPassword;
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Loader from 'components/Loader/Loader';
import { Notify } from 'notiflix';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { register } from '../../redux/auth/authOperations';
import { selectError, selectIsLoading } from '../../redux/auth/authSelector';

export const RegisterForm = props => {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    if (!isValidInputs()) {
      return;
    }
    const form = e.currentTarget;
    const data = new FormData(e.currentTarget);

    dispatch(
      register({
        email: data.get('email'),
        password: data.get('password'),
      })
    );
    form.reset();

    Notify.success(
      `${data.get('email')} was successfully registerd! Please log in.`,
      {
        position: 'right-bottom',
      }
    );
  };

  const isValidInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <>
      {isLoading && <Loader />}
      <Card
        variant="outlined"
        sx={{
          maxWidth: 500,
          margin: '40px auto',
          justifyContent: 'center',
          display: 'flex',
          borderRadius: '10px',
        }}
      >
        <CardContent>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: '100%',
              fontSize: '30px',
              margin: '20px 0',
              fontWeight: 'bold',
            }}
          >
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '400px',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                sx={{ ariaLabel: 'email' }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel htmlFor="password">Password</FormLabel>
              </Box>

              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ fontWeight: 'bold' }}
            >
              Register
            </Button>
            <Typography
              variant="subtitle2"
              sx={{ textAlign: 'center', marginBottom: '10px' }}
            >
              or{' '}
              <span>
                <NavLink
                  to="/login"
                  variant="body2"
                  sx={{ alignSelf: 'center' }}
                >
                  Log in
                </NavLink>
              </span>{' '}
              anyway.
            </Typography>
          </Box>
          {error && (
            <Typography
              sx={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }}
            >
              {error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};

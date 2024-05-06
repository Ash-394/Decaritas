import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Link, Container, Box } from '@mui/material';
import userService from '../service/userservice';
import UseWallet from './useWallet';


const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
});

const Login = () => {
  const navigate = useNavigate();

  const [connectedWallet, setConnectedWallet] = useState(null);

  const handleConnectWallet = async () => {
    const account = await UseWallet();
    setConnectedWallet(account); // Example: set the connected wallet address here
  };


  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const user = await userService.login(values.email, values.password, connectedWallet);
      if (user){
        alert("User logged in successfully!");
        navigate('/user');
      }
      else{
        alert("User does not exist!");
      }
      
    } catch (error) {
      alert("User doesn't exist");
      console.error('Error logging in:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="container">
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <Field as={TextField} variant="outlined" margin="normal" fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus />
              <ErrorMessage name="email" component="div" />
              <Field as={TextField} variant="outlined" margin="normal" fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
              <ErrorMessage name="password" component="div" />
              {connectedWallet ? (
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="walletAddress"
                  label="Wallet Address"
                  type="text"
                  id="walletAddress"
                  value={connectedWallet}
                  disabled
                />
              ) : (
                <div>
                  <Button onClick={handleConnectWallet} fullWidth variant="contained" color="primary" className="connectWallet">
                    Connect Wallet
                  </Button>
                </div>
              )}
              <div className='mt-6'></div>
              {connectedWallet ? (
              <Button type="submit" fullWidth variant="contained" color="primary" className="submit" disabled={isSubmitting}>
                Login
              </Button>
              ) :(
                <Button type="submit" fullWidth variant="contained" color="primary" className="submit" disabled = {true} >
                Login
              </Button>
              )}
            </Form>
          )}
        </Formik>
        <Box mt={2}>
          <Link component={RouterLink} to="/signup" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Box>
      </div>
    </Container>
  );
};

export default Login;
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

const VerifierLogin = () => {
  const navigate = useNavigate();

  const [connectedWallet, setConnectedWallet] = useState(null);

  const handleConnectWallet = async () => {
    const account = await UseWallet();
    setConnectedWallet(account);
  };


  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const verifier = await userService.login(values.email, values.password, connectedWallet);
      if (verifier) {
        if (connectedWallet === '0x373dc81415fcb8ded4bd13bfc73219f6d9845be8') {
          alert("Verifier logged in successfully!");
          navigate('/verifier');
          return;
        }
        else {
          alert("Only verifier can login");
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="container">
        <Typography component="h1" variant="h5">
          Verifier Login
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
              ) : (
                <Button type="submit" fullWidth variant="contained" color="primary" className="submit" disabled={true} >
                  Login
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default VerifierLogin;
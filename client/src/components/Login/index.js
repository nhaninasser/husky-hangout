import React, { useState } from "react";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useMutation } from '@apollo/client';
import { TextField, Button, Alert, Container } from '@mui/material';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: userFormData,
      });
      if (error) {
        throw new Error("something went wrong!");
      }

      const token = data.login.token;
      // console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

// return (
//   <h1>Hello Login!</h1>
// )

  return (
    <Container >
      <form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>

        <TextField
        type="text"
        placeholder="Your email"
        name="email"
        onChange={handleInputChange}
        value={userFormData.email}
        fullWidth
        margin= "normal"
        required />

        <TextField
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
            fullWidth
            margin= "normal"
          />
  
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;

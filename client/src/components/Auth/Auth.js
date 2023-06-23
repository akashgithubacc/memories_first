import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { CreateOrGetUser } from "./userData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({ isLoggedIn, setIsLoggedIn }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  //let isSignup = false;
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      profile: formData.firstName.split(" ")[0],
    };

    const sub = "";
    dispatch({ type: "AUTH", data: { result, sub } });
    setIsLoggedIn(true);
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const googleSuccess = async (res) => {
    CreateOrGetUser(res)
      .then(({ result, sub }) => {
        dispatch({ type: "AUTH", data: { result, sub } });
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const googleFailure = () => {
    console.log("Not able to sign in with Google. Try again Later!!");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={10}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Sign in"}</Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign up
          </Button>

          <GoogleLogin
            clientId="848767098696-kk4tdbnm0c748s1t9u49qcebmmn2m3us.apps.googleusercontent.com"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            fullWidth
          />
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

import React, { useState } from "react";
import { 
  Button, 
  Container, 
  Typography, 
  Paper, 
  Box, 
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FcGoogle } from "react-icons/fc";

import { auth, provider } from "../Firebase/Firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#171c30",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(7, 15, 63, 0.4)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4, 6),
  },
  logo: {
    marginBottom: theme.spacing(3),
    width: 80,
    height: 80,
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: 700,
    color: "#ffffff",
    fontSize: "2rem",
  },
  subtitle: {
    color: "#a0a0c0",
    marginBottom: theme.spacing(4),
    textAlign: "center",
  },
  socialButton: {
    padding: theme.spacing(1.5),
    margin: theme.spacing(1, 0),
    borderRadius: 8,
    width: "100%",
    textTransform: "none",
    fontSize: 16,
    fontWeight: 600,
    transition: "all 0.2s",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  googleButton: {
    backgroundColor: "#ffffff",
    color: "#333333",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  githubButton: {
    backgroundColor: "#24292e",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#2f363d",
    },
  },
  twitterButton: {
    backgroundColor: "#1DA1F2",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#0d95e8",
    },
  },
  divider: {
    width: "100%",
    margin: theme.spacing(3, 0),
  },
  dividerText: {
    color: "#a0a0c0",
    padding: theme.spacing(0, 1),
    backgroundColor: "#171c30",
  },
  footer: {
    marginTop: theme.spacing(3),
    color: "#a0a0c0",
    textAlign: "center",
  },
  link: {
    color: "#64b5f6",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
}));

function SignUp() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = () => {
    setLoading(true);
    auth
      .signInWithPopup(provider)
      .then((res) => {
        console.log("Success");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: 40, marginBottom: 40 }}>
      <Paper className={classes.root} elevation={0}>
        <Box className={classes.paper}>
          {/* Logo */}
          <Box 
            className={classes.logo} 
            bgcolor="#3f51b5" 
            display="flex" 
            alignItems="center" 
            justifyContent="center" 
            borderRadius="50%"
          >
            <Typography variant="h4" style={{ color: "white" }}>C</Typography>
          </Box>

          <Typography className={classes.title} variant="h4">
            Welcome to Chatter
          </Typography>
          
          <Typography className={classes.subtitle} variant="body1">
            Connect with friends and join the conversation
          </Typography>

          <Button
            variant="contained"
            className={`${classes.socialButton} ${classes.googleButton}`}
            startIcon={<FcGoogle className={classes.buttonIcon} />}
            onClick={signInWithGoogle}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Continue with Google"
            )}
          </Button>
          
          <Box className={classes.footer} mt={4}>
            <Typography variant="body2">
              By continuing, you agree to Chatter's{" "}
              <a href="/" className={classes.link}>Terms of Service</a> and{" "}
              <a href="/" className={classes.link}>Privacy Policy</a>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignUp;
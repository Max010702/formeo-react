import { useState, type FormEvent } from "react";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

import type { LoginInput, MemberInput } from "../../lib/types/member";

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
  onSignup?: (input: MemberInput) => void;
  onLogin?: (input: LoginInput) => void;
}

const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: 2,
};

const paperStyle = {
  width: "min(900px, 100%)",
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "#fffdf9",
  border: "1px solid rgba(90, 66, 46, 0.14)",
  borderRadius: "24px",
  boxShadow: "0 30px 80px rgba(33, 26, 21, 0.3)",
  outline: "none",
};

export default function AuthenticationModal({
  signupOpen,
  loginOpen,
  handleSignupClose,
  handleLoginClose,
  onSignup,
  onLogin,
}: AuthenticationModalProps) {
  const [signupInput, setSignupInput] = useState<MemberInput>({
    memberNick: "",
    memberPhone: "",
    memberPassword: "",
  });

  const [loginInput, setLoginInput] = useState<LoginInput>({
    memberNick: "",
    memberPassword: "",
  });

  const handleSignupSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !signupInput.memberNick.trim() ||
      !signupInput.memberPhone.trim() ||
      !signupInput.memberPassword.trim()
    ) {
      return;
    }

    onSignup?.(signupInput);
  };

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loginInput.memberNick.trim() || !loginInput.memberPassword.trim()) {
      return;
    }

    onLogin?.(loginInput);
  };

  return (
    <>
      <Modal
        aria-labelledby="signup-modal-title"
        aria-describedby="signup-modal-description"
        sx={modalStyle}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backgroundColor: "rgba(27, 21, 17, 0.68)",
              backdropFilter: "blur(6px)",
            },
          },
        }}
      >
        <Fade in={signupOpen}>
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            sx={paperStyle}
          >
            <Box
              component="img"
              src="/img/auth.webp"
              alt="Premium furniture interior"
              sx={{
                width: {
                  xs: "100%",
                  md: "52%",
                },
                minHeight: {
                  xs: 220,
                  md: 560,
                },
                maxHeight: {
                  xs: 260,
                  md: "none",
                },
                objectFit: "cover",
              }}
            />

            <Box
              component="form"
              onSubmit={handleSignupSubmit}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: {
                  xs: 3,
                  sm: 5,
                },
              }}
            >
              <Typography
                id="signup-modal-title"
                component="h2"
                sx={{
                  color: "#211a15",
                  fontFamily: "Georgia, serif",
                  fontSize: {
                    xs: "2rem",
                    md: "2.5rem",
                  },
                  fontWeight: 500,
                }}
              >
                Create Account
              </Typography>

              <Typography
                id="signup-modal-description"
                sx={{
                  mt: 1,
                  mb: 4,
                  color: "#796b5f",
                }}
              >
                Join us and create your perfect home.
              </Typography>

              <Stack spacing={2.5}>
                <TextField
                  id="signup-username"
                  label="Username"
                  name="memberNick"
                  value={signupInput.memberNick}
                  onChange={(event) =>
                    setSignupInput((previous) => ({
                      ...previous,
                      memberNick: event.target.value,
                    }))
                  }
                  autoComplete="username"
                  fullWidth
                  required
                />

                <TextField
                  id="signup-phone"
                  label="Phone number"
                  name="memberPhone"
                  type="tel"
                  value={signupInput.memberPhone}
                  onChange={(event) =>
                    setSignupInput((previous) => ({
                      ...previous,
                      memberPhone: event.target.value,
                    }))
                  }
                  autoComplete="tel"
                  fullWidth
                  required
                />

                <TextField
                  id="signup-password"
                  label="Password"
                  name="memberPassword"
                  type="password"
                  value={signupInput.memberPassword}
                  onChange={(event) =>
                    setSignupInput((previous) => ({
                      ...previous,
                      memberPassword: event.target.value,
                    }))
                  }
                  autoComplete="new-password"
                  fullWidth
                  required
                />
              </Stack>

              <Button
                type="submit"
                variant="contained"
                startIcon={<PersonAddAltIcon />}
                sx={{
                  mt: 4,
                  minHeight: 52,
                  borderRadius: "12px",
                  bgcolor: "#7b5638",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    bgcolor: "#5f402a",
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Stack>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
        sx={modalStyle}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backgroundColor: "rgba(27, 21, 17, 0.68)",
              backdropFilter: "blur(6px)",
            },
          },
        }}
      >
        <Fade in={loginOpen}>
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            sx={{
              ...paperStyle,
              width: "min(800px, 100%)",
            }}
          >
            <Box
              component="img"
              src="/img/auth.webp"
              alt="Premium furniture interior"
              sx={{
                width: {
                  xs: "100%",
                  md: "50%",
                },
                minHeight: {
                  xs: 220,
                  md: 480,
                },
                maxHeight: {
                  xs: 260,
                  md: "none",
                },
                objectFit: "cover",
              }}
            />

            <Box
              component="form"
              onSubmit={handleLoginSubmit}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: {
                  xs: 3,
                  sm: 5,
                },
              }}
            >
              <Typography
                id="login-modal-title"
                component="h2"
                sx={{
                  color: "#211a15",
                  fontFamily: "Georgia, serif",
                  fontSize: {
                    xs: "2rem",
                    md: "2.5rem",
                  },
                  fontWeight: 500,
                }}
              >
                Welcome Back
              </Typography>

              <Typography
                id="login-modal-description"
                sx={{
                  mt: 1,
                  mb: 4,
                  color: "#796b5f",
                }}
              >
                Sign in to continue shopping.
              </Typography>

              <Stack spacing={2.5}>
                <TextField
                  id="login-username"
                  label="Username"
                  name="memberNick"
                  value={loginInput.memberNick}
                  onChange={(event) =>
                    setLoginInput((previous) => ({
                      ...previous,
                      memberNick: event.target.value,
                    }))
                  }
                  autoComplete="username"
                  fullWidth
                  required
                />

                <TextField
                  id="login-password"
                  label="Password"
                  name="memberPassword"
                  type="password"
                  value={loginInput.memberPassword}
                  onChange={(event) =>
                    setLoginInput((previous) => ({
                      ...previous,
                      memberPassword: event.target.value,
                    }))
                  }
                  autoComplete="current-password"
                  fullWidth
                  required
                />
              </Stack>

              <Button
                type="submit"
                variant="contained"
                startIcon={<LoginIcon />}
                sx={{
                  mt: 4,
                  minHeight: 52,
                  borderRadius: "12px",
                  bgcolor: "#7b5638",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    bgcolor: "#5f402a",
                  },
                }}
              >
                Login
              </Button>
            </Box>
          </Stack>
        </Fade>
      </Modal>
    </>
  );
}

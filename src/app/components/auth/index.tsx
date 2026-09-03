import { useState, type ChangeEvent, type KeyboardEvent } from "react";
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

import { Messages } from "../../lib/config";
import type { LoginInput, MemberInput } from "../../lib/types/member";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import MemberService from "../../services/MemberService";

const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: 2,
};

const paperStyle = {
  width: "min(820px, 100%)",
  maxHeight: "90vh",
  overflow: "auto",
  bgcolor: "#fffdf9",
  borderRadius: "24px",
  boxShadow: "0 30px 80px rgba(33, 26, 21, 0.3)",
  outline: "none",
};

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal({
  signupOpen,
  loginOpen,
  handleSignupClose,
  handleLoginClose,
}: AuthenticationModalProps) {
  const [memberNick, setMemberNick] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberPassword, setMemberPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const clearInputs = () => {
    setMemberNick("");
    setMemberPhone("");
    setMemberPassword("");
  };

  const handleUserName = (event: ChangeEvent<HTMLInputElement>) => {
    setMemberNick(event.target.value);
  };

  const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setMemberPhone(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setMemberPassword(event.target.value);
  };

  const handleSignupRequest = async () => {
    try {
      if (!memberNick.trim() || !memberPhone.trim() || !memberPassword.trim()) {
        throw new Error(Messages.error3);
      }

      const signupInput: MemberInput = {
        memberNick: memberNick.trim(),
        memberPhone: memberPhone.trim(),
        memberPassword,
      };

      setLoading(true);

      const memberService = new MemberService();
      await memberService.signup(signupInput);

      clearInputs();
      handleSignupClose();
    } catch (error) {
      await sweetErrorHandling(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRequest = async () => {
    try {
      if (!memberNick.trim() || !memberPassword.trim()) {
        throw new Error(Messages.error3);
      }

      const loginInput: LoginInput = {
        memberNick: memberNick.trim(),
        memberPassword,
      };

      setLoading(true);

      const memberService = new MemberService();
      await memberService.login(loginInput);

      clearInputs();
      handleLoginClose();
    } catch (error) {
      await sweetErrorHandling(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    if (signupOpen) {
      void handleSignupRequest();
    }

    if (loginOpen) {
      void handleLoginRequest();
    }
  };

  return (
    <>
      <Modal
        aria-labelledby="signup-modal-title"
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={modalStyle}
      >
        <Fade in={signupOpen}>
          <Stack direction={{ xs: "column", md: "row" }} sx={paperStyle}>
            <Box
              component="img"
              src="/img/auth.webp"
              alt="Furniture interior"
              sx={{
                width: { xs: "100%", md: "52%" },
                minHeight: { xs: 220, md: 520 },
                maxHeight: { xs: 250, md: "none" },
                objectFit: "cover",
              }}
            />

            <Stack
              justifyContent="center"
              sx={{ flex: 1, p: { xs: 3, md: 5 } }}
            >
              <Typography
                id="signup-modal-title"
                component="h2"
                sx={{
                  fontFamily: "Georgia, serif",
                  fontSize: "2.25rem",
                  color: "#211a15",
                }}
              >
                Create Account
              </Typography>

              <Typography sx={{ mt: 1, mb: 3, color: "#796b5f" }}>
                Join Formeo and discover premium furniture.
              </Typography>

              <Stack spacing={2}>
                <TextField
                  label="Username"
                  value={memberNick}
                  onChange={handleUserName}
                  autoComplete="username"
                  fullWidth
                  required
                />

                <TextField
                  label="Phone number"
                  type="tel"
                  value={memberPhone}
                  onChange={handlePhone}
                  autoComplete="tel"
                  fullWidth
                  required
                />

                <TextField
                  label="Password"
                  type="password"
                  value={memberPassword}
                  onChange={handlePassword}
                  onKeyDown={handlePasswordKeyDown}
                  autoComplete="new-password"
                  fullWidth
                  required
                />
              </Stack>

              <Button
                variant="contained"
                startIcon={<PersonAddAltIcon />}
                disabled={loading}
                onClick={() => void handleSignupRequest()}
                sx={{ mt: 3, minHeight: 50 }}
              >
                {loading ? "Please wait..." : "Sign Up"}
              </Button>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="login-modal-title"
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={modalStyle}
      >
        <Fade in={loginOpen}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{ ...paperStyle, width: "min(760px, 100%)" }}
          >
            <Box
              component="img"
              src="/img/auth.webp"
              alt="Furniture interior"
              sx={{
                width: { xs: "100%", md: "50%" },
                minHeight: { xs: 220, md: 460 },
                maxHeight: { xs: 250, md: "none" },
                objectFit: "cover",
              }}
            />

            <Stack
              justifyContent="center"
              sx={{ flex: 1, p: { xs: 3, md: 5 } }}
            >
              <Typography
                id="login-modal-title"
                component="h2"
                sx={{
                  fontFamily: "Georgia, serif",
                  fontSize: "2.25rem",
                  color: "#211a15",
                }}
              >
                Welcome Back
              </Typography>

              <Typography sx={{ mt: 1, mb: 3, color: "#796b5f" }}>
                Log in to continue shopping.
              </Typography>

              <Stack spacing={2}>
                <TextField
                  label="Username"
                  value={memberNick}
                  onChange={handleUserName}
                  autoComplete="username"
                  fullWidth
                  required
                />

                <TextField
                  label="Password"
                  type="password"
                  value={memberPassword}
                  onChange={handlePassword}
                  onKeyDown={handlePasswordKeyDown}
                  autoComplete="current-password"
                  fullWidth
                  required
                />
              </Stack>

              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                disabled={loading}
                onClick={() => void handleLoginRequest()}
                sx={{ mt: 3, minHeight: 50 }}
              >
                {loading ? "Please wait..." : "Login"}
              </Button>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </>
  );
}

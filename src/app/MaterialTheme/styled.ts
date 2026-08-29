import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

export const RippleBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    width: 11,
    minWidth: 11,
    height: 11,
    padding: 0,
    border: "2px solid #ffffff",
    borderRadius: "50%",
    color: "#78936a",
    backgroundColor: "#78936a",
    boxShadow: "0 0 0 1px rgba(33, 26, 21, 0.08)",

    "&::after": {
      position: "absolute",
      inset: -4,
      border: "1px solid currentColor",
      borderRadius: "50%",
      content: '""',
      animation: "profile-ripple 1.5s infinite ease-out",
    },
  },

  "@keyframes profile-ripple": {
    "0%": {
      opacity: 0.9,
      transform: "scale(0.7)",
    },

    "70%": {
      opacity: 0,
      transform: "scale(1.7)",
    },

    "100%": {
      opacity: 0,
      transform: "scale(1.7)",
    },
  },

  "@media (prefers-reduced-motion: reduce)": {
    "& .MuiBadge-badge::after": {
      animation: "none",
    },
  },
});

import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

export const RippleBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    color: theme.palette.secondary.main, // #B78A5A warm gold
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,

    "&::after": {
      position: "absolute",
      top: "-2px",
      left: "-2px",
      width: "120%",
      height: "120%",
      borderRadius: "50%",
      animation: "ripple 1.5s infinite ease-in-out",
      border: "2px solid currentColor",
      content: '""',
    },
  },

  "@keyframes ripple": {
    "0%": {
      transform: "scale(0.8)",
      opacity: 0.9,
    },
    "100%": {
      transform: "scale(2.3)",
      opacity: 0,
    },
  },
}));

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const FixedCenterModal = styled(Box)({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "black",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(199, 0, 0, 0.1)",
  zIndex: 1000,

  // on big screen using media query
  "@media (min-width: 768px)": {
    height: "600px",
    width: "600px",
  },

  // on small
  "@media (max-width: 768px)": {
    height: "100%",
    width: "100%",
  },
  transition: "all 0.5s ease-in-out",
});

export const PageWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "2rem",
  paddingTop: "3rem",
  height: "100%",
  alignItems: "center",
  textAlign: "center",
  transition: "all 0.5s ease-in-out",
  overflow: "auto",
});

export const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

export const ButtonStyled = styled(Button)({
  backgroundColor: "royalblue",
  color: "white",
  "&:hover": {
    backgroundColor: "blue",
  },
});

export const BackButtonStyled = styled(Box)({
  // backgroundColor: "#303030",
  color: "white",
  position: "absolute",
  top: "10px",
  left: "10px",
  padding: "5px",
  cursor: "pointer",
  borderRadius: "50%",

  "&:hover": {
    backgroundColor: "rgba(30, 30, 30, 0.5)",
  },
});

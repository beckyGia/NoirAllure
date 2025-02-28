import { styled } from "@mui/system";

const ScrollbarWrapper = styled("div")(({ theme }) => ({
  overflowY: "auto", // Enables vertical scrolling
  "&::-webkit-scrollbar": {
    width: "6px",
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.secondary.medium,
    borderRadius: "6px",
    marginBlock: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.secondary.medium,
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  scrollbarWidth: "thin",
  scrollbarColor: `${theme.palette.secondary.medium} transparent`,
}));

export default ScrollbarWrapper;

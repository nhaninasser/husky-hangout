import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { FaWolfPackBattalion } from "react-icons/fa";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import useScreenSize from "../../hooks/screenSize/useScreenSize";

export default function FixedBottomNavigation() {
  const { isDesktop } = useScreenSize();
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  return (
    !isDesktop && (
      <Box sx={{ pb: 7 }} ref={ref}>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Home"
              icon={<FaWolfPackBattalion />}
            />
            <BottomNavigationAction label="Dashboard" icon={<ArchiveIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>
    )
  );
}

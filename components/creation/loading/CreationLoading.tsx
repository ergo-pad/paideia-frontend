import { Box, CircularProgress } from "@mui/material";
import * as React from "react";
import DarkLogo from "../../../public/logos/dark_logo.svg";
import LightLogo from "../../../public/logos/light_logo.svg";
import { DarkTheme, LightTheme } from "../../../theme/theme.js";

const CreationLoading: React.FC<{theme: any}> = (props) => {
    const [logo, setLogo] = React.useState(
        props.theme === DarkTheme ? LightLogo : DarkLogo
      );
    
  return (
    <>
      <Box
        sx={{
          color: "primary.text",
          position: "fixed",
          top: 0,
          left: 0,
          height: "3.5rem",
          display: "flex",
          width: " 100%",
          alignItems: "center",
          backgroundColor: 'fileInput.outer',
          borderBottom: '1px solid',
          borderBottomColor: 'divider.main',
          pl: '1.5rem'
        }}
      >
        <img src={logo.src} />
      </Box>
      <Box sx={{ mt: "3.5rem", height: 'calc(100vh - 13.5rem)', color: 'primary.text', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <CircularProgress size='5rem' thickness={5}/>
        <Box sx={{textAlign: 'center', fontSize: '1.2rem', mt: '1rem'}}>
            Please wait while we create your DAO
        </Box>
        <Box sx={{textAlign: 'center', fontSize: '1rem', mt: '.2rem', color: 'primary.lightText'}}>
            Setting your DAOs governance structure, minting the token, making it look awesome.
        </Box>
      </Box>
    </>
  );
};

export default CreationLoading;
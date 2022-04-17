import { Box, Switch } from "@mui/material";
import * as React from "react";
import { Header, Subheader } from "./HeaderComponents";

const LabeledSwitch: React.FC<{
  title: string;
  value: boolean;
  onChange: Function;
  subtitle?: string;
}> = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: "1rem", mb: "1rem" }}>
      <Box>
        {props.subtitle === undefined ? (
          <Subheader title={props.title} />
        ) : (
          <Header title={props.title} subtitle={props.subtitle} />
        )}
      </Box>
      <Box sx={{ ml: "auto" }}>
        <Switch
          checked={props.value}
          onChange={() => props.onChange(!props.value)}
        />
      </Box>
    </Box>
  );
};

export default LabeledSwitch;

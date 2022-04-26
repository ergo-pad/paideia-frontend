import { Box, Button, ButtonGroup } from "@mui/material";
import * as React from "react";
import { ITokenomics } from "../../../lib/creation/Api";
import { IData, IObj } from "../../../lib/utilities";
import { Header } from "../utilities/HeaderComponents";
import Emissions from "./Charts/Emissions";
import PieChart from "./Charts/PieChart";

const TokenDistribution: React.FC<IData<ITokenomics>> = (props) => {
  const [chartView, setChartView] = React.useState<string>("pie");
  let chartLookup: IObj<JSX.Element> = {
    'pie':  <PieChart {...props.data}/>,
    'table': <Box>Table Here...</Box>,
    'emission': <Emissions {...props.data}/>
  }
  return (
    <Box sx={{ mt: "1rem", mb: "1rem" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Header title="Token distribution information" />
        <Box sx={{ ml: "auto" }}>
          <ButtonGroup variant="outlined" sx={{ width: "100%" }}>
            <Button
              sx={{
                width: "30%",
                fontSize: ".8rem",
                backgroundColor:
                  chartView === "pie" ? "primary.selectedButton" : "",
              }}
              onClick={() => setChartView("pie")}
            >
              Pie
            </Button>
            <Button
              sx={{
                width: "40%",
                fontSize: ".8rem",
                backgroundColor:
                  chartView === "emission" ? "primary.selectedButton" : "",
              }}
              onClick={() => setChartView("emission")}
            >
              Emission
            </Button>
            <Button
              sx={{
                width: "30%",
                fontSize: ".8rem",
                backgroundColor:
                  chartView === "table" ? "primary.selectedButton" : "",
              }}
              onClick={() => setChartView("table")}
            >
              Table
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      <Box sx={{mt: '1rem', height: '25rem'}}>
          {chartLookup[chartView]}
      </Box>     
    </Box>
  );
};

export default TokenDistribution;

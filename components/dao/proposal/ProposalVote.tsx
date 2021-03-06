import {
  Header,
  LearnMore,
} from "@components/creation/utilities/HeaderComponents";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { IObj } from "@lib/utilities";
import { Box, Button } from "@mui/material";
import { IProposalAction } from "@pages/dao/[id]/proposal/create";
import * as React from "react";
import Options from "./vote/Options";
import Selector from "./vote/Selector";
import YesNo from "./vote/YesNo/YesNo";
import AddIcon from "@mui/icons-material/Add";
import { deviceWrapper } from "@components/utilities/Style";

interface IVoteChoice {
  title: string;
  icon: JSX.Element;
  subtitle: string;
  change: () => void;
}

export const VoteChoice: React.FC<IVoteChoice> = (props) => {
  return (
    <Box
      onClick={props.change}
      sx={{
        backgroundColor: "fileInput.outer",
        width: deviceWrapper("100%", "50%"),
        p: ".5rem",
        mt: deviceWrapper("1rem", "0"),

        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: ".3rem",
        cursor: "pointer",
        border: 1,
        borderColor: "border.main",
        flexDirection: "column",
        textAlign: "center",
        ":hover": {
          borderColor: "primary.main",
        },
      }}
    >
      {props.icon}
      <Header title={props.title} large subtitle={props.subtitle} />
    </Box>
  );
};

const ProposalVote: React.FC = () => {
  const context = React.useContext<IProposalContext>(ProposalContext);
  const content: IObj<JSX.Element> = {
    unselected: <Selector />,
    "yes/no": <YesNo />,
    options: <Options />,
  };
  const votingSystem = context.api.value.votingSystem;
  return (
    <>
      <LearnMore
        title={"Voting system"}
        tooltipTitle={"Title here"}
        tooltipText={"Content here"}
        tooltipLink="/here"
      />
      {content[votingSystem]}
      {context.api.value.actions.filter(
        (i: IProposalAction) => i.name === undefined
      ).length === 0 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: ".5rem",
          }}
        >
          <Button
            endIcon={<AddIcon />}
            onClick={() => {
              const temp = [...context.api.value.actions];
              temp.push({
                name: undefined,
                data: undefined,
              });
              context.api.setValue({
                ...context.api.value,
                actions: temp,
              });
            }}
          >
            Add Another Action
          </Button>
        </Box>
      )}
    </>
  );
};

export default ProposalVote;

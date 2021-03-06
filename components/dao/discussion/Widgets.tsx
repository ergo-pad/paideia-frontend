import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { Avatar, Box, Button } from "@mui/material";
import * as React from "react";
import Musk from "@public/profile/musk-full.png";
import { deviceWrapper } from "@components/utilities/Style";

export const Overview: React.FC<{ proposal?: boolean }> = (props) => {
  return (
    <Box
      sx={{
        backgroundColor: "fileInput.outer",
        border: "1px solid",
        borderColor: "border.main",
        borderRadius: ".3rem",
        width: "100%",
        mb: "1rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          borderBottom: "1px solid",
          borderBottomColor: "border.main",
          p: ".5rem",
        }}
      >
        <CapsInfo
          title={props.proposal ? "Proposal By" : "Discussion By"}
          mb={"0"}
        />
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Avatar sx={{ width: "2.5rem", height: "2.5rem" }}>
            <img src={Musk.src} />
          </Avatar>
          <Box sx={{ ml: "1rem" }}>
            <Box sx={{ fontSize: "1rem" }}>Alone Musk</Box>
            <Box sx={{ fontSize: ".8rem", color: "text.secondary" }}>
              Level 7 | Philosopher
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: deviceWrapper("none", "flex"),
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            mt: "1rem",
            mb: "1rem",
          }}
        >
          <Box
            sx={{
              fontSize: ".8rem",
              color: "text.secondary",
              textAlign: "center",
              borderRight: "1px solid",
              borderRightColor: "border.main",
              pr: "1rem",
            }}
          >
            Followers
            <Box sx={{ color: "text.primary", fontSize: "1.4rem" }}>107</Box>
          </Box>
          <Box
            sx={{
              fontSize: ".8rem",
              pl: "1rem",
              color: "text.secondary",
              textAlign: "center",
              borderRight: "1px solid",
              borderRightColor: "border.main",
              pr: "1rem",
            }}
          >
            Created
            <Box sx={{ color: "text.primary", fontSize: "1.4rem" }}>13</Box>
          </Box>
          <Box
            sx={{
              fontSize: ".8rem",
              pl: "1rem",
              color: "text.secondary",
              textAlign: "center",
            }}
          >
            Approved
            <Box sx={{ color: "text.primary", fontSize: "1.4rem" }}>7</Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          size="small"
          sx={{
            width: "100%",
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            pt: ".25rem",
            pb: ".25rem",
          }}
        >
          View Profile
        </Button>
      </Box>
    </Box>
  );
};

export const State: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "fileInput.outer",
        border: "1px solid",
        borderColor: "border.main",
        borderRadius: ".3rem",
        width: "100%",
        mb: "1rem",
        p: ".5rem",
      }}
    >
      <CapsInfo title="this proposal is in the discussion state" />
      <Box sx={{ mt: "-.5rem", fontSize: ".9rem", color: "text.secondary" }}>
        Get feedback from the other members about an idea you have before
        commiting to a full proposal. Discussions can easily be upgraded to
        proposals at any time.
      </Box>
    </Box>
  );
};

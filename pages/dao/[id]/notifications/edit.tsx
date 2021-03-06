import { Box, TextField, Button, Modal } from "@mui/material";
import * as React from "react";
import { Header } from "@components/creation/utilities/HeaderComponents";
import LabeledSwitch from "@components/creation/utilities/LabeledSwitch";
import { IObj } from "@lib/utilities";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Status from "@components/utilities/Status";
import Layout from "@components/dao/Layout";
import { deviceWrapper } from "@components/utilities/Style";

const notifications = [
  {
    label: "A comment is made in a proposal I created",
    value: "createProposal",
  },
  {
    label: "A vote is casted in a proposal I created",
    value: "voteCastCreatedProposal",
  },
  { label: "A proposal I voted on ends", value: "proposalVotedEnded" },
  {
    label: "A proposal I voted on gets a new addendum",
    value: "votedAddendum",
  },
  { label: "A proposal I voted on is approved", value: "voteOnApproved" },
  { label: "A proposal I voted on is denied", value: "voteOnDenied" },
  { label: "A reply is written to a comment I made", value: "commentReply" },
  {
    label: "A user I follow creates a proposal",
    value: "followingNewProposal",
  },
  {
    label: "A DAO termination proposal is created",
    value: "terminationProposal",
  },
];

const EditNotifications: React.FC<{ params: any }> = (props) => {
  const [value, setValue] = React.useState<IObj<any>>({
    showEmail: true,
    emailAddress: "alone.musk@gmail.com",
    showPhone: false,
    phoneNumber: "",
    createProposal: true,
    voteCastCreatedProposal: false,
    proposalVotedEnded: false,
    votedAddendum: true,
    voteOnApproved: true,
    voteOnDenied: true,
    commentReply: false,
    followingNewProposal: true,
    terminationProposal: false,
    alert: undefined,
  });

  React.useEffect(() => {
    if (value.alert === "success") {
      setTimeout(() => setValue({ ...value, alert: undefined }), 3000);
    } else if (value.alert === "info") {
      setTimeout(() => setValue({ ...value, alert: "success" }), 3000);
    }
  }, [value.alert]);

  return (
    <Layout>
      <Header title="Notification settings" large />
      <LabeledSwitch
        title="Notify me through email"
        value={value.showEmail}
        onChange={() => setValue({ ...value, showEmail: !value.showEmail })}
        small
      />
      {value.showEmail && (
        <TextField
          value={value.emailAddress}
          label="Email address"
          sx={{ width: "100%" }}
          onChange={(e: any) =>
            setValue({ ...value, emailAddress: e.target.value })
          }
        />
      )}
      <LabeledSwitch
        title="Notify me through phone"
        value={value.showPhone}
        small
        onChange={() => setValue({ ...value, showPhone: !value.showPhone })}
      />
      {value.showPhone && (
        <TextField
          value={value.phoneNumber}
          label="Phone number"
          sx={{ width: "100%" }}
          onChange={(e: any) =>
            setValue({ ...value, phoneNumber: e.target.value })
          }
        />
      )}
      <Box sx={{ width: "100%", mt: "1.5rem", fontSize: ".9rem" }}>
        Notify me when
        <FormGroup>
          {notifications.map((i: any) => (
            <FormControlLabel
              disableTypography
              onClick={() => setValue({ ...value, [i.value]: !value[i.value] })}
              control={<Checkbox checked={value[i.value]} size="small" />}
              label={i.label}
              sx={{
                mt: ".25rem",
                mb: ".25rem",
                fontSize: deviceWrapper(".8rem", ".9rem"),
              }}
            />
          ))}
        </FormGroup>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "1rem",
        }}
      >
        <Button
          variant="outlined"
          sx={{ width: "49%", mr: ".5rem" }}
          size="small"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ width: "49%" }}
          size="small"
          onClick={() => setValue({ ...value, alert: "info" })}
        >
          <Box sx={{ display: deviceWrapper("none", "block") }}>
            Save Changes
          </Box>
          <Box sx={{ display: deviceWrapper("block", "none") }}>Save</Box>
        </Button>
      </Box>
      <Status
        value={value.alert}
        current="notification settings."
        action="updated"
      />
    </Layout>
  );
};

export default EditNotifications;

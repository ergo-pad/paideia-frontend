import DiscussionContext, {
  IDiscussionContext,
} from "@lib/dao/discussion/DiscussionContext";
import ProposalContext, {
  IProposalContext,
} from "@lib/dao/proposal/ProposalContext";
import { Autocomplete, Avatar, Box, Chip, TextField } from "@mui/material";
import * as React from "react";
import { proposals } from "../dashboard/ActiveProposals";

// proposal or discussion
// abstract: img, name, id

const Reference: React.FC<{ context?: boolean }> = (props) => {
  const context =
    props.context === undefined
      ? React.useContext<IDiscussionContext>(DiscussionContext)
      : React.useContext<IProposalContext>(ProposalContext);
  const references = context.api.value.references;
  return (
    <Autocomplete
      multiple
      id="tags-filled"
      // @ts-ignore
      isOptionEqualToValue={(option: any, temp: string) =>
        references.indexOf(option.id) > -1
      }
      options={proposals || []}
      filterSelectedOptions
      // @ts-ignore
      value={references}
      sx={{ mt: "1rem" }}
      // @ts-ignore
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: any, c: number) => {
          let temp = proposals.filter((i: any) => i.id === option);
          let val = temp[0];
          return (
            <Chip
              color="primary"
              variant="filled"
              label={val.proposalName}
              {...getTagProps({ index: c })}
              key={"chip-tag-" + c}
              avatar={<Avatar sx={{ fontSize: ".8rem" }}></Avatar>}
            />
          );
        })
      }
      onInputChange={(
        event: React.SyntheticEvent,
        _value: string,
        reason: string
      ) => {
        console.log(event, _value);
      }}
      // @ts-ignore
      onChange={(
        event: React.SyntheticEvent,
        _value: any,
        reason: string,
        details?: string
      ) => {
        console.log(reason, event.target);
        context.api.setValue({ ...context.api.value, references: _value });
      }}
      getOptionLabel={(option: any) => option.id.toString()}
      renderOption={(props, option: any) => (
        // @ts-ignore
        <li
          {...props}
          onClick={() => {
            let temp = [...references];
            let index = temp.indexOf(option.id);

            if (index > -1) {
              temp.splice(index, 1);
            } else {
              temp.push(option.id);
            }

            context.api.setValue({
              ...context.api.value,
              references: temp,
            });
          }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Avatar sx={{ width: "2rem", height: "2rem" }}></Avatar>
          <Box sx={{ ml: ".5rem", fontSize: ".9rem" }}>
            {option.proposalName}
            <Box
              sx={{
                fontSize: ".8rem",
                fontWeight: 400,
                color: "text.secondary",
              }}
            >
              ID: {option.id}
            </Box>
          </Box>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          // InputProps={{
          //   notched: true
          // }}
          label="Reference an existing proposal or discussion"
          placeholder="Search for proposal"
        />
      )}
    />
  );
};

export default Reference;

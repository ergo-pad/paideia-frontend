import { CapsInfo } from "@components/creation/utilities/HeaderComponents";
import { Box, Avatar } from "@mui/material";
import * as React from "react";
import { activities } from "../dashboard/LatestActivity";
import dateFormat from "dateformat";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Musk from "../../../public/profile/musk-full.png";

const Activity: React.FC = () => {
  return (
    <Box>
      <CapsInfo title={`User Activity`} />
      {activities.map((i: any, c: number) => {
        return (
          <Box
            key={`activities-key-profile-${c}`}
            sx={{
              width: "100%",
              pb: "1rem",
              display: "flex",
              alignItems: "center",
              fontSize: ".8rem",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
              <Avatar
                sx={{ mr: ".5rem", width: "2rem", height: "2rem" }}
                src={Musk.src}
              ></Avatar>
              <Box>
                {i.name + " "}
                <Box
                  sx={{
                    display: "inline",
                    color: "text.secondary",
                    ml: ".1rem",
                    mr: ".1rem",
                  }}
                >
                  {i.action}
                </Box>
                {" " + i.proposalname}
              </Box>
            </Box>

            <Box
              sx={{
                ml: "auto",
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CalendarTodayIcon sx={{ mr: ".5rem" }} />
              {dateFormat(i.date, "mmm dd, yyyy: h:MM")}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Activity;

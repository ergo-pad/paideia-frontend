import { Header } from "@components/creation/utilities/HeaderComponents";
import Layout from "@components/dao/Layout";
import {
  Box,
  Paper,
  InputBase,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Fab,
  Slide,
} from "@mui/material";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Slider from "@mui/material/Slider";
import Chip from "@components/utilities/Chip";
import AppsIcon from "@mui/icons-material/Apps";
import StarIcon from "@mui/icons-material/Star";
import MemberCard, { IMemberCard } from "@components/dao/members/MemberCard";
import Musk from "@public/profile/musk-full.png";
import { paths, props } from "@lib/DaoPaths";
import { deviceWrapper } from "@components/utilities/Style";
import MobileFilters from "@components/dao/members/MobileFilters";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

// export const getStaticPaths = paths;
// export const getStaticProps = props;
export const marks = [
  {
    value: 1,
    label: "Level 1",
  },
  {
    value: 2,
    label: "",
  },
  {
    value: 3,
    label: "",
  },
  {
    value: 4,
    label: "",
  },
  {
    value: 5,
    label: "",
  },
  {
    value: 6,
    label: "",
  },
  {
    value: 7,
    label: "",
  },
  {
    value: 8,
    label: "",
  },
  {
    value: 9,
    label: "",
  },
  {
    value: 10,
    label: "Level 10",
  },
];

const members: IMemberCard[] = [
  {
    width: "25%",
    favorited: true,
    id: 1,
    name: "Alone Musk",
    level: 7,
    followers: 107,
    created: 13,
    approved: 7,
    img: Musk.src,
  },
  {
    width: "25%",
    favorited: true,
    id: 2,
    name: "Alone Musk",
    level: 7,
    followers: 107,
    created: 13,
    approved: 7,
    img: Musk.src,
  },
  {
    width: "25%",
    favorited: true,
    id: 3,
    name: "Alone Musk",
    level: 7,
    followers: 107,
    created: 13,
    approved: 7,
    img: Musk.src,
  },
  {
    width: "25%",
    favorited: true,
    id: 4,
    name: "Alone Musk",
    level: 7,
    followers: 107,
    created: 13,
    approved: 7,
    img: Musk.src,
  },
  {
    width: "25%",
    favorited: true,
    id: 5,
    name: "Alone Musk",
    level: 7,
    followers: 107,
    created: 13,
    approved: 7,
    img: Musk.src,
  },
  {
    width: "25%",
    favorited: true,
    id: 6,
    name: "Alone Musk",
    level: 7,
    followers: 107,
    created: 13,
    approved: 7,
    img: Musk.src,
  },
  {
    width: "25%",
    favorited: true,
    id: 7,
    name: "Alone Musk",
    level: 7,
    followers: 107,
    created: 13,
    approved: 7,
    img: Musk.src,
  },
  {
    width: "25%",
    favorited: true,
    id: 8,
    name: "Alone Musk",
    level: 7,
    followers: 107,
    created: 13,
    approved: 7,
    img: Musk.src,
  },
];

export const categories = [
  { icon: <AppsIcon sx={{ mr: ".2rem", fontSize: ".9rem" }} />, label: "All" },
  {
    icon: <StarIcon sx={{ mr: ".2rem", fontSize: ".9rem" }} />,
    label: "Proposal creator",
  },
  {
    icon: <StarIcon sx={{ mr: ".2rem", fontSize: ".9rem" }} />,
    label: "Yes person",
  },
  {
    icon: <StarIcon sx={{ mr: ".2rem", fontSize: ".9rem" }} />,
    label: "Communication Starter",
  },
];

export interface IFilters {
  sortBy: string;
  search: string;
  categories: string[];
}

const Members: React.FC = () => {
  const [filters, setFilters] = React.useState<IFilters>({
    search: "",
    sortBy: "",
    categories: ["All"],
  });
  const [value, setValue] = React.useState<number[]>([1, 10]);

  const [showFilters, setShowFilters] = React.useState<boolean>(false);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Layout width="92.5%">
      <Header large title="DAO members" />
      <Box
        sx={{
          mt: "1rem",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "backgroundColor.main",
            border: "1px solid",
            borderColor: "border.main",
            p: ".65rem",
            borderRadius: "5rem",
            display: "flex",
            alignItems: "center",
            ":hover": {
              borderColor: "primary.main",
            },
            width: deviceWrapper("100%", "50%"),
          }}
        >
          <Box
            sx={{
              width: "5%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchIcon sx={{ opacity: ".6", fontSize: "1.2rem" }} />
          </Box>
          <InputBase
            sx={{
              ml: ".5rem",
              fontSize: ".9rem",
              color: "text.primary",
              width: "100%",
            }}
            placeholder="Search member"
            value={filters.search}
            // @ts-ignore
            onChange={(event: any) =>
              setFilters({ ...filters, search: event.target.value })
            }
          />
        </Paper>
        <Box
          sx={{
            width: "25%",
            ml: "2rem",
            mr: "2rem",
            display: deviceWrapper("none", "block"),
          }}
        >
          <Slider
            step={1}
            value={value}
            valueLabelDisplay="auto"
            marks={marks}
            min={1}
            max={10}
            onChange={handleChange}
          />
        </Box>

        <FormControl
          sx={{
            width: "25%",
            ml: "1rem",
            display: deviceWrapper("none", "flex"),
          }}
        >
          <InputLabel id="sort-by-select-label">Sort by</InputLabel>
          <Select
            labelId="sort-by-select-label"
            id="sort-by-select"
            value={filters.sortBy}
            label="Sort by"
            onChange={(event: SelectChangeEvent) =>
              setFilters({ ...filters, sortBy: event.target.value })
            }
          >
            <MenuItem value={"Most Recent"}>Most Recent</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "-webkit-box",
          alignItems: "center",
          pt: ".75rem",
          overflowX: "auto",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {categories.map((i: any, c: number) => (
          <Chip
            {...i}
            set={() => {
              let temp = [...filters.categories];
              let index = temp.indexOf(i.label);
              let allIndex = temp.indexOf("All");
              if (index > -1) {
                temp.splice(index, 1);
              } else {
                if (i.label === "All") {
                  temp = ["All"];
                } else if (i.label !== "All" && allIndex > -1) {
                  temp.splice(allIndex, 1);
                  temp.push(i.label);
                } else {
                  temp.push(i.label);
                }
              }

              setFilters({
                ...filters,
                categories: temp,
              });
            }}
            c={c}
            key={"activity-filter-chip-key-" + c}
            variant={
              filters.categories.indexOf(i.label) > -1
                ? "contained"
                : "outlined"
            }
          />
        ))}
      </Box>
      <Box
        sx={{ display: "flex", width: "100%", flexWrap: "wrap", mt: "1.5rem" }}
      >
        {members.map((i: IMemberCard, c: number) => (
          <MemberCard
            {...i}
            key={"member-card" + c}
            width={{ xs: "100%", sm: "50%", md: "33%", lg: "33%", xl: "25%" }}
          />
        ))}
      </Box>
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          display: deviceWrapper("flex", "none"),
          zIndex: 999,
        }}
        onClick={() => setShowFilters(true)}
      >
        <FilterAltIcon />
      </Fab>
      <Slide direction="left" in={showFilters} mountOnEnter unmountOnExit>
        <Box
          sx={{
            width: "17rem",
            zIndex: 1000,
            backgroundColor: "backgroundColor.main",
            borderRight: "1px solid",
            color: "text.primary",
            borderLeft: "1px solid",
            height: "100vh",
            borderColor: "border.main",
            position: "fixed",
            top: 0,
            right: 0,
          }}
        >
          <MobileFilters
            close={() => setShowFilters(false)}
            set={(filters: IFilters, value) => {
              setFilters(filters);
              setValue(value);
            }}
            filters={filters}
          />
        </Box>
      </Slide>
    </Layout>
  );
};
export default Members;

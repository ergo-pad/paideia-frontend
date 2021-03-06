import { Box, Button, IconButton } from "@mui/material";
import * as React from "react";
import { Subheader } from "../../creation/utilities/HeaderComponents";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProposalCard from "../proposals/ProposalCard";
import useDidMountEffect from "@components/utilities/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { deviceStruct, deviceWrapper } from "@components/utilities/Style";
import CardSlider from "@components/CardSlider";

let temp = new Date();
temp.setDate(temp.getDate() - 30);

export const proposals: {
  id: number;
  proposalName: string;
  status: string;
  likes: number;
  dislikes: number;
  userSide: any;
  favorited: boolean;
  category: string;
  widget: Date | string;
  yes?: number | undefined;
  no?: number | undefined;
  comments?: undefined | number;
  users?: undefined | number;
  date?: undefined | Date;
}[] = [
  {
    id: 1,
    proposalName: "ProposalName 1",
    status: "Challenged",
    likes: 158,
    dislikes: 31,
    userSide: undefined,
    favorited: true,
    category: "Finance",
    widget: new Date(),
    yes: 114,
    no: 92,
  },
  {
    id: 2,
    proposalName: "ProposalName 2",
    status: "Active",
    likes: 158,
    dislikes: 31,
    userSide: 0,
    favorited: false,
    category: "Category 1",
    widget: "Hot",
    yes: 114,
    no: 92,
  },
  {
    id: 3,
    proposalName: "ProposalName 3",
    status: "Discussion",
    likes: 158,
    dislikes: 31,
    userSide: 1,
    favorited: true,
    category: "Category 2",
    widget: temp,
    comments: 115,
    users: 27,
  },
  {
    id: 4,
    proposalName: "ProposalName 4",
    status: "Unchallenged",
    likes: 158,
    dislikes: 31,
    userSide: undefined,
    favorited: false,
    category: "Category 3",
    widget: "Hot",
    date: new Date(),
  },
  {
    id: 5,
    proposalName: "ProposalName 5",
    status: "Unchallenged",
    likes: 158,
    dislikes: 31,
    userSide: undefined,
    favorited: true,
    category: "Category 4",
    widget: "DAO termination",
    date: new Date(),
  },
];

const ActiveProposal: React.FC = () => {
  const [slide, setSlide] = React.useState<number>(1);
  const incrementSlide = () =>
    slide + 4 > proposals.length
      ? setSlide(proposals.length)
      : setSlide(slide + 4);
  const decrementSlide = () =>
    slide - 4 < 0 ? setSlide(0) : setSlide(slide - 4);

  useDidMountEffect(() => {
    let element = document.getElementById(
      `proposal-active-${slide === 0 ? slide : slide - 1}`
    );
    element.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [slide]);

  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <CardSlider
        uniqueId="uses"
        addMargin={0}
        buttonTop
        header={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: deviceWrapper("80%", "90%"),
            }}
          >
            <Subheader title="Active proposals" small bold />
            <Box sx={{ ml: "auto" }}>
              <Link
                href={
                  id === undefined
                    ? "dao/proposals/all"
                    : `/dao/${id}/proposals/all`
                }
              >
                <Button sx={{ fontSize: ".8rem", mr: "1rem" }} size="small">
                  View All
                </Button>
              </Link>
            </Box>
          </Box>
        }
      >
        {proposals.map((i: any, c: number) => (
          <ProposalCard
            {...i}
            c={c}
            scrollable
            key={"proposal-card-key-" + c}
            width={deviceStruct("25%", "25%", "35%", "23%", "23%")}
          />
        ))}
      </CardSlider>
    </>
  );
};

export default ActiveProposal;

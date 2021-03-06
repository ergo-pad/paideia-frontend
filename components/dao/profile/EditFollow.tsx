import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";

const EditFollow: React.FC<{ edit: boolean; followed: boolean }> = (props) => {
  const [value, setValue] = React.useState<{ followed: boolean }>({
    followed: props.followed,
  });

  const router = useRouter();
  const { id } = router.query;
  return props.edit ? (
    <Link
      href={id === undefined ? "/dao/profile/edit" : `/dao/${id}/profile/edit`}
    >
      <Button variant="contained" endIcon={<EditIcon />} size="small">
        Edit Profile
      </Button>
    </Link>
  ) : (
    <Button
      onClick={() => setValue({ ...value, followed: !value.followed })}
      sx={{
        color: value.followed ? "error.main" : "text.secondary",
        borderColor: value.followed ? "error.light" : "text.secondary",
        fontSize: { xs: ".5rem", s: ".8rem", md: ".8rem" },
        ":hover": {
          borderColor: "error.light",
          color: "error.light",
        },
      }}
      startIcon={value.followed ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      variant="outlined"
    >
      Follow{value.followed && "ed"}
    </Button>
  );
};

export default EditFollow;

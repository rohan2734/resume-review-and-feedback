import React from "react";
import { Stack, Typography } from "@mui/material";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";

const EditResumeSkillsCard = ({
  skill,
  setSelectedSkillParent,
  setEditSkillCardStatusParent,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        bgcolor: " #F3F4F6",
        borderRadius: "5px",
        p: "0.5rem",
        m: "0.5rem 0",
      }}
      key={skill._id}
    >
      <Stack direction="row" spacing={2}>
        <Typography sx={{ fontWeight: "600" }}>{skill.skillName}</Typography>
        <Typography>{skill.skillLevel}</Typography>
      </Stack>

      <Stack direction="row" spacing={2}>
        <EditIcon
          sx={{ cursor: "pointer" }}
          onClick={() => setSelectedSkillParent(skill._id)}
        />
        <DeleteForeverOutlinedIcon sx={{ cursor: "pointer" }} />
      </Stack>
    </Stack>
  );
};

export default EditResumeSkillsCard;

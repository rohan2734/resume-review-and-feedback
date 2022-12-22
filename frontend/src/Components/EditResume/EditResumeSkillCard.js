import React from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { BASE_URL } from "../../Keys/Keys";

import { Stack, Typography } from "@mui/material";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";

const EditResumeSkillsCard = ({
  skillsCurrent,
  setSkillsCurrentParent,
  setSelectedSkillParent,
  setEditSkillCardStatusParent,
  setParentsResumeDetails,
}) => {
  var { resumeId } = useParams();
  const onDeleteHandler = (skill) => {
    var token = localStorage.getItem("token");

    var headers = {
      authorization: `Bearer ${token}`,
    };

    axios({
      method: "PATCH",
      url: `${BASE_URL}/api/resumes/edit-resume-delete-skill`,
      data: {
        skillId: skill._id,
        resumeId: resumeId,
      },
      headers,
    })
      .then((res) => {
        console.log({ resp: res.data });

        if (res.data.status == 200) {
          setSkillsCurrentParent((prevState) => [
            ...prevState,
            res.data.updatedResume.skills,
          ]);
          setParentsResumeDetails((prevState) => ({
            ...prevState,
            skills: [...prevState.skills, res.data.updatedResume.skills],
          }));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Stack>
      {skillsCurrent?.map((skill) => (
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
            <Typography sx={{ fontWeight: "600" }}>
              {skill.skillName}
            </Typography>
            <Typography>{skill.skillLevel}</Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <EditIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedSkillParent(skill);
                setEditSkillCardStatusParent((prevState) => !prevState);
              }}
            />
            <DeleteForeverOutlinedIcon
              sx={{ cursor: "pointer" }}
              onClick={() => onDeleteHandler(skill)}
            />
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default EditResumeSkillsCard;

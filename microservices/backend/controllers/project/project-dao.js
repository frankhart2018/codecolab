import AWS from "aws-sdk";

import projectModel from "./project-model.js";
import userModel from "../users/user-model.js";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

export const createProject = (name, description, owner_id) => {
  return projectModel.create({
    name: name,
    owner_id: owner_id,
    description: description,
    language: "python",
    file_structure: {},
    stars: 0,
  });
};

export const findProjectByName = (name, owner_id) => {
  return projectModel.findOne({
    name: name,
    owner_id: owner_id,
  });
};

export const findProjectById = (project_id) => {
  return projectModel.findOne({
    _id: project_id,
  });
};

export const createDirInProject = (project, project_id, dir_name, path) => {
  const path_split = path.split("/");

  let current_dir = project.file_structure;

  if (path_split.length === 1 && path_split[0] === "") {
    current_dir.children.push({
      name: dir_name,
      type: "dir",
      s3_uri: "",
      children: [],
    });
  } else {
    for (let i = 0; i < path_split.length; i++) {
      const dir_name = path_split[i];
      current_dir = current_dir.children.find(
        (child) => child.name === dir_name
      );
    }

    current_dir.children.push({
      name: dir_name,
      type: "dir",
      s3_uri: "",
      children: [],
    });
  }

  return projectModel.findByIdAndUpdate(
    project_id,
    {
      file_structure: project.file_structure,
    },
    { new: true }
  );
};

export const createFileInProject = (project, project_id, file_name, path) => {
  const path_split = path.split("/");

  let current_dir = project.file_structure;

  if (path_split.length === 1 && path_split[0] === "") {
    current_dir.children.push({
      name: file_name,
      type: "file",
      s3_uri: "",
      children: [],
    });
  } else {
    for (let i = 0; i < path_split.length; i++) {
      const dir_name = path_split[i];
      current_dir = current_dir.children.find(
        (child) => child.name === dir_name
      );
    }

    current_dir.children.push({
      name: file_name,
      type: "file",
      s3_uri: "",
      children: [],
    });
  }

  return projectModel.findByIdAndUpdate(
    project_id,
    {
      file_structure: project.file_structure,
    },
    { new: true }
  );
};

export const deleteInProject = (project, project_id, name, path) => {
  const path_split = path.split("/");

  let current_dir = project.file_structure;

  if (path_split.length === 1 && path_split[0] === "") {
    current_dir.children = current_dir.children.filter(
      (child) => child.name !== name
    );
  } else {
    for (let i = 0; i < path_split.length; i++) {
      const dir_name = path_split[i];
      current_dir = current_dir.children.find(
        (child) => child.name === dir_name
      );
    }

    current_dir.children = current_dir.children.filter(
      (child) => child.name !== name
    );
  }

  return projectModel.findByIdAndUpdate(
    project_id,
    {
      file_structure: project.file_structure,
    },
    { new: true }
  );
};

export const renameInProject = (project, project_id, name, new_name, path) => {
  const path_split = path.split("/");

  let current_dir = project.file_structure;

  if (path_split.length === 1 && path_split[0] === "") {
    const file = current_dir.children.find((child) => child.name === name);
    file.name = new_name;
  } else {
    for (let i = 0; i < path_split.length; i++) {
      const dir_name = path_split[i];
      current_dir = current_dir.children.find(
        (child) => child.name === dir_name
      );
    }

    const child = current_dir.children.find((child) => child.name === name);
    child.name = new_name;
  }

  return projectModel.findByIdAndUpdate(
    project_id,
    {
      file_structure: project.file_structure,
    },
    { new: true }
  );
};

export const getS3URL = async (
  project,
  project_id,
  path,
  code = "#Type here...",
  updateCode = false
) => {
  const path_split = path.split("/");

  let current_dir = project.file_structure;
  //if path length is 1
  if (path_split.length === 1 && path_split[0] != "") {
    //check if s3_url is exist
    const file = current_dir.children.find(
      (child) => child.name === path_split[0]
    );
    const s3_uri = file.s3_uri;
    if (s3_uri != "" && !updateCode) {
      return s3_uri;
    }
    //if s3_url doesn't exist
    else {
      const uri = await createS3URL(project_id, path, code);
      const file = current_dir.children.find(
        (child) => child.name === path_split[0]
      );
      console.log(file);
      file.s3_uri = uri;
      await projectModel.findByIdAndUpdate(
        project_id,
        {
          file_structure: project.file_structure,
        },
        { new: true }
      );

      return uri;
    }
  } else {
    for (let i = 0; i < path_split.length; i++) {
      const dir_name = path_split[i];
      current_dir = current_dir.children.find(
        (child) => child.name === dir_name
      );
    }

    const s3_uri = current_dir.s3_uri;
    if (s3_uri != "" && !updateCode) {
      return s3_uri;
    } else {
      const uri = await createS3URL(project_id, path, code);
      current_dir.s3_uri = uri;
      await projectModel.findByIdAndUpdate(
        project_id,
        {
          file_structure: project.file_structure,
        },
        { new: true }
      );
      return uri;
    }
  }
};

export const createS3URL = async (project_id, path, code) => {
  const data = await s3
    .upload({
      Bucket: "code-connect",
      Body: code,
      Key: project_id + "/" + path,
      ACL: "public-read",
    })
    .promise();
  return data.Location;
};

export const starProject = async (project, project_id, user_id) => {
  project.stars += 1;

  const project_res = await projectModel.findByIdAndUpdate(
    project_id,
    {
      stars: project.stars,
    },
    { new: true }
  );

  const user = await userModel.findOne({ _id: user_id });

  if (!user.starred_projects.has(project_id)) {
    user.starred_projects.set(project_id, project.name);
  }

  const user_res = await userModel.findByIdAndUpdate(
    user_id,
    {
      starred_projects: user.starred_projects,
    },
    { new: true }
  );

  return {
    project: project_res,
    user: user_res,
  };
};

export const unstarProject = async (project, project_id, user_id) => {
  project.stars -= 1;

  const project_res = await projectModel.findByIdAndUpdate(
    project_id,
    {
      stars: project.stars,
    },
    { new: true }
  );

  const user = await userModel.findOne({ _id: user_id });

  if (user.starred_projects.has(project_id)) {
    user.starred_projects.delete(project_id);
  }

  const user_res = await userModel.findByIdAndUpdate(
    user_id,
    {
      starred_projects: user.starred_projects,
    },
    { new: true }
  );

  return {
    project: project_res,
    user: user_res,
  };
};

export const isProjectStarred = async (project_id, user_id) => {
  const user = await userModel.findOne({ _id: user_id });

  return { res: user.starred_projects.has(project_id) };
};

export const fetchAllProjects = async (owner_id) => {
  const projects = await projectModel.find(
    { owner_id: owner_id },
    { file_structure: false }
  );
  return projects;
};

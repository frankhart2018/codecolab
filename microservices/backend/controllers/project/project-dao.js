import projectModel from "./project-model.js";
import AWS from 'aws-sdk'
const s3 = new AWS.S3({
  // accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  // secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  accessKeyId: "AKIA6PYYRQR36PAYRLES",
  secretAccessKey: "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",
})
export const createProject = (name, owner_id) => {
  return projectModel.create({
    name: name,
    owner_id: owner_id,
    language: "python",
    file_structure: {},
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


export const getS3URL = async (project, project_id, path, code = "#Type here...", updateCode = false) => {
  const path_split = path.split("/");

  let current_dir = project.file_structure;
  //if path length is 1
  if (path_split.length === 1 && path_split[0] != "") {

    //check if s3_url is exist
    const file = current_dir.children.find((child) => child.name === path_split[0]);
    const s3_uri = file.s3_uri;
    if (s3_uri != "" && !updateCode) {
      return s3_uri;
    }
    //if s3_url doesn't exist
    else {
      const uri = await createS3URL(project_id, path, code)
      const file = current_dir.children.find((child) => child.name === path_split[0]);
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
    }
    else {
      const uri = await createS3URL(project_id, path, code)
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

}

export const createS3URL = async (project_id, path, code) => {

  const data = await s3.upload({
    Bucket: 'code-connect',
    Body: code,
    Key: project_id + '/' + path,
    ACL: 'public-read'
  }).promise()
  return data.Location;

}
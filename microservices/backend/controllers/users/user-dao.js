import userModel from "./user-model.js";

export const findUser = (email) => {
  return userModel.findOne({ email: email });
};

export const createUser = (email, encryptedPassword, name, username) => {
  return userModel.create({
    email: email,
    password: encryptedPassword,
    name: name,
    username: username,
  });
};

export const findUserByUsername = ({ username }) => {
  return userModel.findOne(
    {
      username: username,
    },
    { password: false }
  );
};

export const findUserById = (id) => {
  return userModel.findOne({ _id: id });
};
export const updatePassword = (id, password) => {
  return userModel.updateOne({ _id: id }, { password: password });
};
export const updateUser = (id, content) => {
  return userModel.updateOne({ _id: id }, { $set: content });
};

export const userHasEditPermission = async (project_id, user_id) => {
  const user = await userModel.findOne({ _id: user_id });

  if (user.editing_projects.has(project_id)) {
    return true;
  }

  return false;
};

export const getAllSharedProjects = async (user_id) => {
  const user = await userModel.findOne({ _id: user_id });

  const all_shared_projects = [];

  for (let [project_id, project_name] of user.viewing_projects) {
    all_shared_projects.push({ _id: project_id, name: project_name });
  }

  for (let [project_id, project_name] of user.editing_projects) {
    all_shared_projects.push({ _id: project_id, name: project_name });
  }

  return all_shared_projects;
};

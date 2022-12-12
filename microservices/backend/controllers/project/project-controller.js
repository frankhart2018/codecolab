import * as projectDao from "./project-dao.js";

const createProject = async (req, res) => {
  const { name, description, owner_id } = req.body;

  const project = await projectDao.findProjectByName(name, owner_id);

  if (project) {
    return res.status(400).json({ message: "Project already exists" });
  } else {
    const newProject = await projectDao.createProject(
      name,
      description,
      owner_id
    );
    return res.status(201).json({
      status: 201,
      message: "Project created successfully",
      newProject,
    });
  }
};

const createDirInProject = async (req, res) => {
  const { project_id } = req.params;
  const { dir_name, path } = req.body;

  const project = await projectDao.findProjectById(project_id);

  if (!project) {
    res.status(400).send("Project doesn't exist");
  } else {
    const updated_project = await projectDao.createDirInProject(
      project,
      project_id,
      dir_name,
      path
    );
    res.status(201).send(updated_project);
  }
};

const createFileInProject = async (req, res) => {
  const { project_id } = req.params;
  const { file_name, path } = req.body;

  const project = await projectDao.findProjectById(project_id);

  if (!project) {
    res.status(400).send("Project doesn't exist");
  } else {
    const updated_project = await projectDao.createFileInProject(
      project,
      project_id,
      file_name,
      path
    );
    res.status(201).send(updated_project);
  }
};

const findProjectById = async (req, res) => {
  const { project_id } = req.params;
  const project = await projectDao.findProjectById(project_id);
  if (!project) {
    res.status(400).send("Project doesn't exist");
  } else {
    res.status(200).send(project);
  }
};

const deleteInProject = async (req, res) => {
  const { project_id } = req.params;
  const { name, path } = req.body;

  const project = await projectDao.findProjectById(project_id);

  if (!project) {
    res.status(400).send("Project doesn't exist");
  } else {
    const updated_project = await projectDao.deleteInProject(
      project,
      project_id,
      name,
      path
    );
    res.status(201).send(updated_project);
  }
};

const findInProject = async (req, res) => {
  const { project_id } = req.params;
  const { name, new_name, path } = req.body;

  const project = await projectDao.findProjectById(project_id);

  if (!project) {
    res.status(400).send("Project doesn't exist");
  } else {
    const updated_project = await projectDao.renameInProject(
      project,
      project_id,
      name,
      new_name,
      path
    );
    res.status(201).send(updated_project);
  }
};

const fetchS3URL = async (req, res) => {
  const { project_id } = req.params;
  const { path } = req.body;
  const project = await projectDao.findProjectById(project_id);

  if (!project) {
    return res.status(400).json({ status: 400, message: "Project not found" });
  }
  const s3URL = await projectDao.getS3URL(project, project_id, path);

  return res.status(200).json({ status: 200, url: s3URL, path: path });
};

const updateCodeInProject = async (req, res) => {
  const { project_id } = req.params;
  const { path, code } = req.body;

  const project = await projectDao.findProjectById(project_id);
  if (!project) {
    return res.status(400).json({ status: 400, message: "Project not found" });
  }
  const updated_project = await projectDao.getS3URL(
    project,
    project_id,
    path,
    code,
    true
  );
  return res.status(200).json({
    status: 200,
    projectUrl: updated_project,
    message: "Code updated successfully",
  });
};

const starProject = async (req, res) => {
  const { project_id } = req.params;
  const { user_id } = req.body;

  const project = await projectDao.findProjectById(project_id);

  if (!project) {
    res.status(400).send("Project doesn't exist");
  } else {
    const updated_project = await projectDao.starProject(
      project,
      project_id,
      user_id
    );
    res.status(201).send(updated_project);
  }
};

const unstarProject = async (req, res) => {
  const { project_id } = req.params;
  const { user_id } = req.body;

  const project = await projectDao.findProjectById(project_id);

  if (!project) {
    res.status(400).send("Project doesn't exist");
  } else {
    const updated_project = await projectDao.unstarProject(
      project,
      project_id,
      user_id
    );
    res.status(201).send(updated_project);
  }
};

const isProjectStarred = async (req, res) => {
  const { project_id } = req.params;
  const { user_id } = req.body;

  const project = await projectDao.findProjectById(project_id);

  if (!project) {
    res.status(400).send("Project doesn't exist");
  } else {
    const isStarred = await projectDao.isProjectStarred(project_id, user_id);
    res.status(201).send(isStarred);
  }
};

const getAllProject = async (req, res) => {
  const { owner_id } = req.params;
  const projects = await projectDao.fetchAllProjects(owner_id);
  if (!projects) {
    return res
      .status(400)
      .json({ status: 400, message: "No projects available" });
  }
  return res.status(200).json({ status: 200, projects: projects });
};

const ProjectController = (app) => {
  app.post("/api/get-project/:project_id", fetchS3URL);
  app.get("/api/get-all-projects/:owner_id", getAllProject);
  app.post("/api/update-project/:project_id", updateCodeInProject);
  app.post("/api/create-project", createProject);
  app.post("/api/create-project/dir/:project_id", createDirInProject);
  app.post("/api/create-project/file/:project_id", createFileInProject);
  app.get("/api/project/:project_id", findProjectById);
  app.delete("/api/delete-project/:project_id", deleteInProject);
  app.put("/api/rename-project/:project_id", findInProject);
  app.post("/api/star-project/:project_id", starProject);
  app.post("/api/unstar-project/:project_id", unstarProject);
  app.post("/api/is-project-starred/:project_id", isProjectStarred);
};

export default ProjectController;

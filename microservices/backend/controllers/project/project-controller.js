import * as projectDao from "./project-dao.js";

const createProject = async (req, res) => {
  const { name, owner_id } = req.body;

  const project = await projectDao.findProjectByName(name, owner_id);

  if (project) {
    res.status(400).send("Project already exists");
  } else {
    const newProject = await projectDao.createProject(name, owner_id);
    res.status(201).send(newProject);
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

const ProjectController = (app) => {
  app.post("/api/create-project", createProject);
  app.post("/api/create-project/dir/:project_id", createDirInProject);
  app.post("/api/create-project/file/:project_id", createFileInProject);
  app.get("/api/project/:project_id", findProjectById);
  app.delete("/api/delete-project/file/:project_id", deleteInProject);
  app.delete("/api/delete-project/dir/:project_id", deleteInProject);
};

export default ProjectController;

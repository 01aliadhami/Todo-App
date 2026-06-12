import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import ProjectSidebar from "./components/ProjectSidebar.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });
  function handleSelectProject(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }
  function handleStartAddProjects() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }
  function handleCancelAddProject() {
    setProjectState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }
  function handleAddProject(projectData) {
    setProjectState((prevState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId,
  );
  let content = <SelectedProject project={selectedProject} />;
  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProjects={handleStartAddProjects} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProjects={handleStartAddProjects}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;

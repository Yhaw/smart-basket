import React, { createContext, useState } from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projectID, setProjectID] = useState('');
  const [projectName, setProject_Name] = useState('');

  return (
    <ProjectContext.Provider value={{ projectID, setProjectID, projectName, setProject_Name }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;

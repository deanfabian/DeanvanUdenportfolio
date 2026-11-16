import React from 'react';
import { ProjectPage } from './ProjectPage';
import { PROJECTS } from '../projectsConfig';

interface MustangProjectPageProps {
  onBackToStory: () => void;
}

export const MustangProjectPage: React.FC<MustangProjectPageProps> = ({ onBackToStory }) => {
  return <ProjectPage project={PROJECTS.mustang} onBackToStory={onBackToStory} />;
};

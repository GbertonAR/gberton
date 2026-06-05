import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomeDashboard from './components/HomeDashboard';
import ProfessionalExperience from './components/ProfessionalExperience';
import FlowStateFactory from './components/FlowStateFactory';
import ProjectsView from './components/ProjectsView';
import ContactForm from './components/ContactForm';
import WorldCupPage from './components/WorldCupPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomeDashboard />} />
          <Route path="cv" element={<ProfessionalExperience />} />
          <Route path="factory" element={<FlowStateFactory />} />
          <Route path="contact"   element={<ContactForm />} />
          <Route path="projects"  element={<ProjectsView />} />
          <Route path="worldcup"  element={<WorldCupPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProfessionalExperience from './components/ProfessionalExperience';
import FlowStateEcosystem from './components/FlowStateEcosystem';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <ProfessionalExperience />
        <FlowStateEcosystem />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;

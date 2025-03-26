import './App.css';

import IDELandingPage from './ide-component/IDELandingPage';
import { Header } from './ide-component/header/Header';
import KnowledgeBaseModal from './ide-component/modal/KnowledgeBaseModal';
import AlertModal from './ide-component/modal/AlertModal';
import DiagramModal from './ide-component/modal/DiagramModal';
import TelemetryModal from './ide-component/modal/TelemetryModal';

function App() {
  return (
    <div className="App">  
      <Header />    
      <IDELandingPage />
      {/* <Footer /> */}
      <DiagramModal/>
      <KnowledgeBaseModal/>
      <AlertModal/>
      <TelemetryModal/>
    </div>
  );
}

export default App;

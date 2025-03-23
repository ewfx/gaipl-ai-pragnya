import './App.css';

import DiagramModal from './ide-component/dependency-tree/DiagramModal';
import { useState } from 'react';
import IDELandingPage from './ide-component/IDELandingPage';
import { Header } from './ide-component/header/Header';
import { Footer } from './ide-component/footer/Footer';

function App() {
  const [dependencyTreeOpen, setDependencyTreeOpen] = useState(true);
  return (
    
    <div className="App">  
      <Header />    
      <IDELandingPage />
      {/* <Footer /> */}
      <DiagramModal/>
    </div>
  );
}

export default App;

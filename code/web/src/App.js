import './App.css';
import Layout from './Entry';
import DiagramModal from './DiagramModal';
import { useState } from 'react';

function App() {
  const [dependencyTreeOpen, setDependencyTreeOpen] = useState(true);
  return (
    
    <div className="App">
      <Layout />
      <DiagramModal/>
    </div>
  );
}

export default App;

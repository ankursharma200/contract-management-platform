import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Blueprints from './pages/Blueprints';
import CreateContract from './pages/CreateContract';
import ContractDetails from './pages/ContractDetails';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/blueprints" element={<Blueprints />} />
        <Route path="/create" element={<CreateContract />} />
        <Route path="/contracts/:id" element={<ContractDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;
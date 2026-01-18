import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreateContract from './pages/CreateContract';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/blueprints" element={<div className="text-gray-500">Blueprint Management (Coming Soon)</div>} />
        <Route path="/create" element={<div className="text-gray-500">Create Contract (Coming Soon)</div>} />
        <Route path="/contracts/:id" element={<div className="text-gray-500">Contract Details (Coming Soon)</div>} />
        <Route path="/create" element={<CreateContract />} />
      </Routes>
    </Layout>
  );
}

export default App;
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import Pensum from './pages/Pensum';
import MisMaterias from './pages/MisMaterias';
import Progreso from './pages/Progreso';
import PlanificarTrimestre from './pages/PlanificarTrimestre';
import Layout from './components/Layout';

function App() {
  const { isAuthenticated, loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/registro" element={!isAuthenticated ? <Registro /> : <Navigate to="/dashboard" />} />

        <Route element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pensum" element={<Pensum />} />
          <Route path="/planificar" element={<PlanificarTrimestre />} />
          <Route path="/mis-materias" element={<MisMaterias />} />
          <Route path="/progreso" element={<Progreso />} />
        </Route>

        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;

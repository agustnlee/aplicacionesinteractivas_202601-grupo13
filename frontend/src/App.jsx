import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// import componentes puro layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/layout/PrivateRoute';


// import paginas
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Clientes from './pages/clientes/Clientes';
import ClientesDetail from './pages/clientes/ClientesDetail';
import Creditos from './pages/creditos/Creditos';
import CreditosDetail from './pages/creditos/CreditosDetail';
import Etiquetas from './pages/etiquetas/Etiquetas';
import EtiquetasDetail from './pages/etiquetas/EtiquetasDetail';
import Usuarios from './pages/usuarios/Usuarios';
import UsuariosDetail from './pages/usuarios/UsuariosDetail';

import Test from './pages/Test';


function Layout() {
 return (
    <div className="app">
      <Navbar />

      <div className="app-body">
        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}


function App() {
  return (
      <Routes>
        {/* Rutas sin layout ni auth */}
        <Route path="/auth/login" element={<Login />} />

        {/* Rutas con layout  */}
        <Route element={<Layout />}>

          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />

          <Route element={<PrivateRoute />}>
           <Route path="/auth/register" element={<Register />} />

            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/:id" element={<ClientesDetail />} />

            <Route path="/creditos" element={<Creditos />} />
            <Route path="/creditos/:id" element={<CreditosDetail />} />

            <Route path="/etiquetas" element={<Etiquetas />} />
            <Route path="/etiquetas/:id" element={<EtiquetasDetail />} />

            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuarios/:id" element={<UsuariosDetail />} />
          </Route>

          {/* Cualquier otra ruta */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        
        

      </Routes>
  );
}


export default App;
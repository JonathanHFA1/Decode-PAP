import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './pages/Login'
import AdminDashboard from './admin/AdminDashboard';
import CreateBook from './admin/CreateBook';
import EditBook from './admin/EditBook';
import AdminRoute from './components/AdminRoute';
import Layout from './admin/global/Layout';


//HOC
const AdminDashboarHOC = Layout(AdminDashboard);
const CreateBookHOC = Layout(CreateBook);


const App = () => {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <ProSidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboarHOC /></AdminRoute>} />
              <Route path="/admin/book/create" element={<AdminRoute><CreateBookHOC /></AdminRoute>} />
              <Route path="/admin/book/edit/:id" element={<AdminRoute><EditBook /></AdminRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ProSidebarProvider>
      </Provider>
    </>
  );
};

export default App;

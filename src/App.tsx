import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import PrivateRoute from './components/Auth/PrivateRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';


const queryClient = new QueryClient();

const App: React.FC = () => {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            </Routes>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </>
  );
};

export default App;
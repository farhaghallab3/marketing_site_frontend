// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import DesignerSelection from './pages/DesignerSelection';
import ProjectForm from './pages/ProjectForm';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  React.useEffect(() => {
    // Set default meta tags
    document.title = 'Vivora Agency - وكالة فيفورا للتصميم';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = 'وكالة فيفورا للتصميم - نصنع هويات بصرية مذهلة تساعد الشركات على التميز. تصميم شعارات، هويات علامات تجارية، ومواقع إلكترونية.';
      document.head.appendChild(metaDescription);
    }
  }, []);

  return (
    <div dir="rtl">
      <AuthProvider>
        <OrderProvider>
          <Router>
            <div className="App">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/designers" element={<DesignerSelection />} />
                  <Route path="/project-form" element={<ProjectForm />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </OrderProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
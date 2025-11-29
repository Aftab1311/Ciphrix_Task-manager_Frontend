import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthContext } from "./contexts/AuthContext";

// Protected Route Wrapper (for actions that require authentication)
const ProtectedRoute = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  // Check if user has valid token AND user data
  return user && token ? children : <Navigate to="/signin" replace />;
};

// Admin-only Route (only for delete operations)
const AdminRoute = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  // Check if user has valid token AND is admin
  return user && token && user.role === "admin" ? children : <Navigate to="/dashboard" replace />;
};

// Public Route (redirect to dashboard only if properly authenticated)
const PublicRoute = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  // Only redirect to dashboard if user has valid token AND user data
  return user && token ? <Navigate to="/dashboard" replace /> : children;
};

// Dashboard Route (public but with proper auth check)
const DashboardRoute = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  // Allow access to dashboard for everyone, but if user has valid auth, show personalized content
  if (user && token) {
    return children;
  } else {
    return <SignIn />; // or you can choose to show a generic dashboard view
  }
};

const App = () => {
  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* Public Routes - Only accessible when not logged in */}
        <Route 
          path="/signin" 
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          } 
        />

        {/* Dashboard - Public route but checks authentication */}
        <Route 
          path="/dashboard" 
          element={
            <DashboardRoute>
              <Dashboard />
            </DashboardRoute>
          } 
        />

        {/* Add Task - Protected (requires authentication for both users and admins) */}
        <Route
          path="/task/add"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        />

        {/* Edit Task - Protected but NOT Admin-only (both users and admins can edit) */}
        <Route
          path="/task/edit/:id"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />

        {/* Default route - redirect based on auth status */}
        <Route 
          path="/" 
          element={<Navigate to="/dashboard" replace />} 
        />

        {/* Catch all route - redirect to dashboard */}
        <Route 
          path="*" 
          element={<Navigate to="/dashboard" replace />} 
        />
      </Routes>
    </>
  );
};

export default App;
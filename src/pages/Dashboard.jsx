import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Chip,
  IconButton,
  Fab,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  Refresh,
  Add,
  Dashboard as DashboardIcon,
  Task,
  Person,
  AdminPanelSettings,
  Logout,
} from "@mui/icons-material";
import TaskCard from "../components/TaskCard";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const [tasksData, setTasksData] = useState({
    tasks: [],
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, signout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchPage = async (page = 1) => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get(`/tasks?page=${page}&limit=10`);
      setTasksData(res.data);
    } catch (err) {
      setError("Failed to fetch tasks. Please try again.");
      toast.error("Failed to fetch tasks. Please try again.");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(1);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;  
    try {
      const res = await api.delete(`/tasks/${id}`);
      toast.success("Task deleted successfully!");
      fetchPage(tasksData.page);
    } catch (err) {
      console.error("Delete error:", err);
      if (err.response?.status === 403) {
        toast.error("Access denied: Only administrators can delete tasks.");
      } else if (err.response?.status === 401) {
        toast.error("Please log in again to perform this action.");
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to delete task. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      signout();
      toast.success("Logged out successfully!");
      navigate("/signin");
    }
  };

  const statsCards = [
    {
      title: "Total Tasks",
      value: tasksData.total,
      icon: <Task sx={{ fontSize: 40 }} />,
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      title: "Current Page",
      value: tasksData.tasks.length,
      icon: <DashboardIcon sx={{ fontSize: 40 }} />,
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      title: "Total Pages",
      value: tasksData.totalPages,
      icon: <AdminPanelSettings sx={{ fontSize: 40 }} />,
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <CircularProgress size={40} sx={{ color: "white" }} />
        </Box>
        <Typography variant="h5" sx={{ opacity: 0.8 }}>
          Loading your dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      {/* Navigation Bar with Logout */}
      <AppBar 
        position="static" 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          mb: 4
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Welcome, {user?.name || 'User'}
            </Typography>
            <Button
              color="inherit"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 2,
            }}
          >
            Welcome back, {user?.name || "Admin"}!
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Chip
              icon={<Person />}
              label={user?.role === "admin" ? "Administrator" : "User"}
              color={user?.role === "admin" ? "primary" : "default"}
              variant="outlined"
            />
            <Chip
              icon={<DashboardIcon />}
              label={`${tasksData.total} Total Tasks`}
              color="secondary"
              variant="outlined"
            />
          </Box>
        </Box>

        {/* Stats Cards - Uncomment if you want to use them */}
        {/* <Grid container spacing={3} sx={{ mb: 6 }}>
          {statsCards.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  background: stat.color,
                  color: 'white',
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {stat.icon}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid> */}

        {/* Error Alert */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 4,
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            action={
              <IconButton onClick={() => fetchPage(1)} color="inherit">
                <Refresh />
              </IconButton>
            }
          >
            {error}
          </Alert>
        )}

        {/* Tasks Section */}
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            background: "white",
            mb: 4,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                Tasks Overview
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={() => fetchPage(1)}
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Refresh
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => navigate("/task/add")}
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                    "&:hover": {
                      boxShadow: "0 12px 35px rgba(102, 126, 234, 0.4)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Add New Task
                </Button>
              </Box>
            </Box>

            {tasksData.tasks.length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 8,
                  background:
                    "linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)",
                  borderRadius: 3,
                  border: "2px dashed",
                  borderColor: "grey.300",
                }}
              >
                <Task sx={{ fontSize: 60, color: "grey.400", mb: 2 }} />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  No tasks found
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Get started by creating your first task
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => navigate("/task/add")}
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Create First Task
                </Button>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {tasksData.tasks.map((t) => (
                  <Grid item xs={12} md={6} lg={4} key={t._id}>
                    <TaskCard
                      task={t}
                      canDelete={user?.role === "admin"}
                      onDelete={() => handleDelete(t._id)}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {tasksData.totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              page={tasksData.page}
              totalPages={tasksData.totalPages}
              onChange={fetchPage}
            />
          </Box>
        )}

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add task"
          onClick={() => navigate("/task/add")}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
              transform: "scale(1.1)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <Add />
        </Fab>
      </Container>
    </Box>
  );
}
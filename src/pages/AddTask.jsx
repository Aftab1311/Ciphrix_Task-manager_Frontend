import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
  MenuItem,
  InputAdornment,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material';
import {
  AddTask as AddTaskIcon,
  Title,
  Description,
  Assignment,
  ArrowBack
} from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddTask() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!task.title.trim()) {
      toast.error("Title is required");
      setLoading(false);
      return;
    }

    if (!task.description.trim()) {
      toast.error("Description is required");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/tasks", task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setLoading(false);
      toast.success("Task Added Successfully!");
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error(err.response?.data?.message || "Error Adding Task");
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        px: 2
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            background: 'white',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden'
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              p: 4,
              textAlign: 'center'
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                backdropFilter: 'blur(10px)'
              }}
            >
              <AddTaskIcon sx={{ fontSize: 40 }} />
            </Box>
            <Typography 
              variant="h3" 
              component="h1" 
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 1
              }}
            >
              Create New Task
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Fill in the details to create a new task
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {/* Error Alert */}
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3, 
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Title Field */}
                <TextField
                  label="Task Title"
                  name="title"
                  fullWidth
                  value={task.title}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Title color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                      }
                    }
                  }}
                  placeholder="Enter task title"
                />

                {/* Description Field */}
                <TextField
                  label="Task Description"
                  name="description"
                  multiline
                  rows={4}
                  fullWidth
                  value={task.description}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Description color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                      }
                    }
                  }}
                  placeholder="Describe the task in detail"
                />

                {/* Status Field */}
                <TextField
                  select
                  label="Task Status"
                  name="status"
                  fullWidth
                  value={task.status}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Assignment color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                      }
                    }
                  }}
                >
                  <MenuItem value="Pending">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: '#ffa726'
                        }}
                      />
                      Pending
                    </Box>
                  </MenuItem>
                  <MenuItem value="Completed">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: '#66bb6a'
                        }}
                      />
                      Completed
                    </Box>
                  </MenuItem>
                </TextField>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ArrowBack />}
                    onClick={() => navigate("/dashboard")}
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      borderRadius: 3,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      borderColor: 'grey.300',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-1px)',
                      }
                    }}
                  >
                    Back to Dashboard
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddTaskIcon />}
                    sx={{
                      py: 1.5,
                      borderRadius: 3,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 10px 25px -5px rgba(102, 126, 234, 0.4)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 15px 35px -5px rgba(102, 126, 234, 0.6)',
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      }
                    }}
                  >
                    {loading ? 'Creating Task...' : 'Create Task'}
                  </Button>
                </Box>
              </Box>
            </form>

            {/* Quick Tips */}
            <Card
              sx={{
                mt: 4,
                background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 3
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Assignment color="primary" />
                  Quick Tips
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Write clear and descriptive titles<br/>
                  • Provide detailed descriptions for better understanding<br/>
                  • Choose appropriate status to track progress
                </Typography>
              </CardContent>
            </Card>
          </CardContent>
        </Paper>
      </Container>
    </Box>
  );
}
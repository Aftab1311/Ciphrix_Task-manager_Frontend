import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Google,
  Twitter
} from '@mui/icons-material';
import api from '../services/api'; // Make sure to import your API service
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please enter all fields");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // Call your backend API for signup
      const response = await api.post('/auth/signup', {
        name,
        email,
        password,
        role: 'user'
      });

      // If signup is successful
      const { token, user } = response.data;
      
      // Store the token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update auth context if available
      if (signIn) {
        signIn(token, user);
      }
      
      setIsLoading(false);
      
      // Show success message and redirect
      toast.success("Signup successful!! Please sign in.");
      navigate("/signin");
    } catch (err) {
      setIsLoading(false);
      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else if (err.response?.status === 400) {
        setError("User with this email already exists");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError("Signup failed. Please check your connection and try again.");
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            p: { xs: 3, sm: 6 },
            borderRadius: 4,
            background: 'white',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* Header Section */}
          <Box textAlign="center" mb={4}>
            <Box
              sx={{
                width: 80,
                height: 80,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: '0 10px 25px -5px rgba(102, 126, 234, 0.4)'
              }}
            >
              <Person sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography 
              variant="h3" 
              component="h1" 
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 1
              }}
            >
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join us today and get started
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSignup}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Name Field */}
              <TextField
                label="Full Name"
                type="text"
                fullWidth
                value={name}
                onChange={e => setName(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
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
              />

              {/* Email Field */}
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
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
              />

              {/* Password Field */}
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
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
                helperText="Password must be at least 6 characters long"
              />

              {/* Confirm Password Field */}
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
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
              />

              {/* Sign Up Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
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
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Create Account'
                )}
              </Button>
            </Box>
          </form>

          {/* Divider */}
          <Divider sx={{ my: 4 }}>
          </Divider>

          {/* Sign In Link */}
          <Box textAlign="center">
            <Typography variant="body1" color="text.secondary">
              Already have an account?{' '}
              <Button
                variant="text"
                onClick={() => navigate("/signin")}
                sx={{
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  color: 'primary.main',
                  '&:hover': {
                    background: 'none',
                    textDecoration: 'underline'
                  }
                }}
              >
                Sign in
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
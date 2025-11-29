import React, { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
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
  Google,
  Twitter
} from '@mui/icons-material';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signin } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  try {
    const res = await api.post('/auth/signin', { email, password });
    signin(res.data.token, res.data.user);
    nav('/dashboard');
  } catch (err) { 
    setError(err.response?.data?.msg || 'Sign in failed. Please try again.');
  } finally {
    setLoading(false);
  }
};
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
              <Lock sx={{ fontSize: 40, color: 'white' }} />
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
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to your account to continue
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={submit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
              />

              {/* Forgot Password */}
              <Box textAlign="right">
                <Button 
                  variant="text" 
                  size="small"
                  sx={{ textTransform: 'none', fontWeight: 500 }}
                >
                  Forgot your password?
                </Button>
              </Box>

              {/* Sign In Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
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
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </Box>
          </form>

          {/* Divider */}
          <Divider sx={{ my: 4 }}>
          </Divider>

          {/* Sign Up Link */}
          <Box textAlign="center">
            <Typography variant="body1" color="text.secondary">
              Don't have an account?{' '}
              <Button
                variant="text"
                onClick={() => nav('/signup')}
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
                Sign up now
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
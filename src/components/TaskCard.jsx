import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  Box,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Edit, 
  Delete, 
  CalendarToday,
  Assignment,
  Schedule,
  CheckCircle,
  PendingActions
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function TaskCard({ task, canDelete, onDelete }) {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'Pending':
        return <PendingActions sx={{ fontSize: 16 }} />;
      default:
        return <Assignment sx={{ fontSize: 16 }} />;
    }
  };

  const handleDelete = () => {
    if (canDelete) {
      onDelete();
    }
  };

  const getStatusGradient = (status) => {
    switch (status) {
      case 'Completed':
        return 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
      case 'Pending':
        return 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)';
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'linear-gradient(135deg, #ffffff 0%, #fafbff 100%)',
        border: '1px solid',
        borderColor: 'rgba(102, 126, 234, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 60px rgba(102, 126, 234, 0.15)',
          borderColor: 'rgba(102, 126, 234, 0.3)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: getStatusGradient(task.status),
        }
      }}
    >
      <CardContent sx={{ p: 3, pb: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Status at the top */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
          <Chip
            icon={getStatusIcon(task.status)}
            label={task.status}
            color={getStatusColor(task.status)}
            variant="filled"
            size="small"
            sx={{
              fontWeight: '700',
              borderRadius: 3,
              fontSize: '0.75rem',
              height: '28px',
              minWidth: 'auto',
              px: 1.5,
              background: getStatusGradient(task.status),
              color: 'white',
              '& .MuiChip-label': {
                px: 0.5,
              }
            }}
          />
        </Box>

        {/* Title below status */}
        <Typography 
          variant="h6" 
          component="h3"
          sx={{
            fontWeight: '700',
            color: 'text.primary',
            lineHeight: 1.3,
            mb: 2,
            fontSize: '1.1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.6rem',
            flexShrink: 0
          }}
        >
          {task.title}
        </Typography>

        {/* Description */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
            borderRadius: 3,
            p: 2,
            mb: 3,
            border: '1px solid',
            borderColor: 'rgba(102, 126, 234, 0.1)',
            flex: 1
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.9rem',
              minHeight: '4.8rem'
            }}
          >
            {task.description || 'No description provided for this task.'}
          </Typography>
        </Box>

        {/* Metadata */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flexShrink: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexShrink: 0
              }}
            >
              <CalendarToday sx={{ fontSize: 16 }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="caption" fontWeight="600" color="text.primary" noWrap>
                Created Date
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary" noWrap>
                {new Date(task.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexShrink: 0
              }}
            >
              <Schedule sx={{ fontSize: 16 }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="caption" fontWeight="600" color="text.primary" noWrap>
                Created Time
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary" noWrap>
                {new Date(task.createdAt).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ p: 3, pt: 1, gap: 1, flexShrink: 0 }}>
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={() => navigate(`/task/edit/${task._id}`)}
          sx={{
            borderRadius: 3,
            textTransform: 'none',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
            flex: 1,
            py: 1,
            fontSize: '0.9rem',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
            }
          }}
        >
          Edit Task
        </Button>
        
        {/* Delete Button */}
        {canDelete ? (
          <Tooltip title="Delete Task (Admin Only)">
            <IconButton
              onClick={handleDelete}
              sx={{
                borderRadius: 3,
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                color: 'white',
                width: 48,
                height: 48,
                '&:hover': {
                  background: 'linear-gradient(135deg, #ff5252 0%, #e53935 100%)',
                  transform: 'scale(1.1)',
                  boxShadow: '0 6px 20px rgba(255, 107, 107, 0.4)',
                }
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Admin privileges required to delete tasks">
            <IconButton
              disabled
              sx={{
                borderRadius: 3,
                background: 'linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)',
                color: 'white',
                width: 48,
                height: 48,
                cursor: 'not-allowed'
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}
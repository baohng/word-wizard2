import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import {
    Select,
  Button,
  Dialog,
  MenuItem,
  Checkbox,
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent,
  FormControlLabel,
} from '@mui/material';

export default function EditUserForm({ open, onClose, onSave, userData }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [roles, setRoles] = useState(['STUDENT']);
  

  const handleSave = () => {
    const newUser = {
      username,
      email,
      password,
      isActive,
      roles,
    };
    onSave(newUser);
    
  };

  useEffect(() => {
    if (userData) {
      setRoles(userData.roles || ['STUDENT']);
    }
  }, [userData]);


  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <TextField
          autoFocus
          margin="dense"
          label="Username"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          }
          label="Active"
        />
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel>Roles</InputLabel>
          <Select
            multiple
            value={roles}
            onChange={(e) => setRoles(e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            <MenuItem value="STUDENT">Student</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
            {/* Add more roles as needed */}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditUserForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string),
  }), // Updated propType for userData
};
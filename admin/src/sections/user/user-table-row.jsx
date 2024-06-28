
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import EditUserForm from './edit-user-form';


// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  username,
  email,
  isActive,
  roles,
  handleClick,
}) {
  const [usersData, setUsersData] = useState([]);
  const [open, setOpen] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
 
  const handleSaveUser = async (userData) => {
    try {
      // Assuming userData is the object containing the updated user information
      const response = await fetch(`http://localhost:8080/api/user-manager/update-user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsersData((prevData) => [...prevData, data]);
    } catch (error) {
      console.error('Error updating user data: ', error);
    }
  };


  const handleCloseMenu = () => {
    setOpen(null);
  };
    const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true);
    handleCloseMenu(); // Close the popover menu when opening the edit dialog
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={username} />
            <Typography variant="subtitle2" noWrap>
              {username}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{roles.join(', ')}</TableCell>

        <TableCell align="center">{isActive ? 'Yes' : 'No'}</TableCell>

        <TableCell>
          <Label color={(isActive === false && 'error') || 'success'}>
            {isActive ? 'Active' : 'Inactive'}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleOpenEditDialog}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        {isEditDialogOpen && (
        <EditUserForm 
          onSave={handleSaveUser}
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          user={{  roles }}
          // You might need to pass additional props like a function to refresh the user list
        />
      )}
        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

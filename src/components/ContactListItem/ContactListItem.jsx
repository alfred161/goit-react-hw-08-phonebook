import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';

export const ContactListItem = ({ filteredContact, deleteContact }) => {
  const handleDelete = () => {
    deleteContact(filteredContact._id);
    Notify.success(
      `${filteredContact.name} was successfully deleted from your contacts!`,
      { position: 'right-bottom' }
    );
  };

  return (
    <>
      <ListItem
        key={filteredContact._id}
        secondaryAction={
          <Button
            edge="end"
            onClick={handleDelete}
            sx={{ textTransform: 'none' }}
          >
            Delete
          </Button>
        }
        disablePadding
        sx={{
          borderLeft: '1px solid lightgrey',
          marginBottom: '5px',
          width: '545px',
        }}
      >
        <ListItemButton>
          <ListItemAvatar>
            <Avatar alt={`Avatar ${filteredContact._id + 1}`} />
          </ListItemAvatar>
          <ListItemText
            id={filteredContact._id}
            primary={filteredContact.name + ' [' + filteredContact.phone + ']'}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
};

ContactListItem.propTypes = {
  filteredContact: PropTypes.object.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

import { Box, Button, FormControl, FormLabel, TextField } from '@mui/material';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectError,
  selectIsLoading,
} from '../../redux/contacts/contactSelectors';
import Loader from 'components/Loader/Loader';

export const ContactForm = ({ addContact, contacts }) => {
  const error = useSelector(selectError);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const isLoading = useSelector(selectIsLoading);

  const handleNameChange = e => setName(e.target.value);
  const handlePhoneChange = e => setPhone(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '' || phone.trim() === '') {
      Notify.failure('Plese enter name and number', {
        position: 'right-bottom',
      });
      return;
    }

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      Notify.failure(`${name} is already in your contacts!`, {
        position: 'right-bottom',
      });
      return;
    } else {
      Notify.success(`${name} is successfully added to your contacts!`, {
        position: 'right-bottom',
      });
    }

    addContact({
      name: name.trim(),
      email: 'test@gmail.com',
      phone: phone.trim(),
    });

    setName('');
    setPhone('');
  };

  return (
    <>
      {isLoading && <Loader />}
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: 'flex',
          width: '100',
          gap: 0.5,
          marginBottom: '20px',
        }}
      >
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <TextField
            id="name"
            placeholder="Name"
            autoComplete="name"
            autoFocus
            fullWidth
            variant="outlined"
            sx={{ ariaLabel: 'email' }}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            value={name}
            onChange={handleNameChange}
            size="small"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Number</FormLabel>
          <TextField
            type="tel"
            name="number"
            placeholder="Number"
            pattern="\\(\\d{3}\\)\\s\\d{3}[-\\s]\\d{4}"
            title="Phone number must follow the format (XXX) XXX-XXXX"
            required
            value={phone}
            onChange={handlePhoneChange}
            id="password"
            autoComplete="current-password"
            fullWidth
            variant="outlined"
            size="small"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password" sx={{ color: 'transparent' }}>
            Add
          </FormLabel>
          <Button
            type="submit"
            fullWidth
            size="medium"
            variant="contained"
            sx={{ fontWeight: 'bold', lineHeight: 2 }}
          >
            Add
          </Button>
        </FormControl>
        {error && Notify.failure(error, { position: 'right-bottom' })}
      </Box>
    </>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
};

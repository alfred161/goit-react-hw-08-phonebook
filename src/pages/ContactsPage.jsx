import { Box } from '@mui/material';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import Loader from 'components/Loader/Loader';
import { PhonebookHeader } from 'components/PhonebookHeader/PhonebookHeader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  deleteContact,
  fetchContacts,
} from '../redux/contacts/contactOperations';
import {
  selectContacts,
  selectFilter,
  selectIsLoading,
} from '../redux/contacts/contactSelectors';
import { setFilter } from '../redux/filter/filterSlice';
export const ContactsPage = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = newContact => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleSetFilter = newFilter => {
    dispatch(setFilter(newFilter));
  };

  const visibleContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter?.toLowerCase() || '');
  });

  return (
    <>
      {isLoading && <Loader />}
      <PhonebookHeader />
      <Box
        component="div"
        sx={{
          padding: '10px 24px',
          marginTop: '70px',
        }}
      >
        <ContactForm addContact={handleAddContact} contacts={visibleContacts} />
        <Filter filter={filter} setFilter={handleSetFilter} />
        {visibleContacts && (
          <ContactList
            contacts={visibleContacts}
            deleteContact={handleDeleteContact}
          />
        )}
      </Box>
    </>
  );
};

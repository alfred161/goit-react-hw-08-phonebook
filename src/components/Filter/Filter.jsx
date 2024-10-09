import { Button, FormControl, FormLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';

export const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = e => setFilter(e.target.value);

  const handleClear = () => {
    document.getElementById('filter').value = '';
    setFilter('');
  };

  return (
    <>
      <FormControl sx={{ marginBottom: '20px' }}>
        <FormLabel htmlFor="name">Contacts</FormLabel>
        <TextField
          id="filter"
          autoComplete="filter"
          required
          fullWidth
          variant="outlined"
          sx={{ ariaLabel: 'filter' }}
          type="text"
          name="filter"
          size="small"
          placeholder="Search by name"
          value={filter}
          onChange={handleFilterChange}
        />
      </FormControl>{' '}
      <FormControl>
        <FormLabel htmlFor="password" sx={{ color: 'transparent' }}>
          Clear
        </FormLabel>
        <Button
          fullWidth
          size="medium"
          variant="outlined"
          sx={{ fontWeight: 'bold', lineHeight: 2 }}
          onClick={handleClear}
        >
          Clear
        </Button>
      </FormControl>
    </>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

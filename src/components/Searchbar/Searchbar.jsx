import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Headers, Form, Button, Span, Input } from './Searchbar.styled';
import Notiflix from 'notiflix';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!searchQuery) {
      Notiflix.Notify.warning('The input field must not be empty! Try again');
      return;
    }
    onSubmit({ searchQuery });
    setSearchQuery('');
  };

  return (
    <Headers>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <Span>
            <FaSearch size={20} />
          </Span>
        </Button>

        <Input
          type="text"
          placeholder="Search images and photos"
          name="name"
          value={searchQuery}
          onChange={handleChange}
        />
      </Form>
    </Headers>
  );
};

export default Searchbar;

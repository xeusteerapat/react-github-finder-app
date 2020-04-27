import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, showClearBtn, clearUsers, setAlert }) => {
  const [text, setText] = useState('');

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (text === '') {
      setAlert('Please enter something', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  const renderClearBtn = () => {
    if (showClearBtn) {
      return (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <form action="" className="form" onSubmit={handleSubmit}>
        <input
          name="text"
          type="text"
          placeholder="Search User..."
          value={text}
          onChange={handleChange}
        />
        <input type="submit" className="btn btn-dark btn-block" />
      </form>
      {renderClearBtn()}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClearBtn: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default Search;

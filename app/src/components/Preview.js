import React from 'react';

const Search = props =>
  <form>
    <div className="form-group">
      <label htmlFor="search">Search:</label>

      <br />
      <button onClick={props.handleFormSubmit} className="btn btn-primary">
        View Your Movies
      </button>

    </div>
  </form>;

export default Search;

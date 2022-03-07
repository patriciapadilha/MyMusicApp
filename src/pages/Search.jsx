import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        Pagina Search
        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

export default Search;

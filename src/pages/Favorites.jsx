import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        Página Favorites
        <Loading />
      </div>
    );
  }
}

export default Favorites;

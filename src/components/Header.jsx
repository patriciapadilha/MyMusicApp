import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import headphone from '../img/headphone.png';
import Loading from './Loading';
import '../css/Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userName: '',
    };
    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    this.setState({ loading: true });
    const response = await getUser();
    this.setState({
      userName: response.name,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header className="header" data-testid="header-component">
        <div className='user'>
          {loading ? <Loading />
            : (
              <div className='username'>
                <img src={ headphone } alt="fone de ouvido azul" />
                <p data-testid="header-user-name">
                  { userName }
                </p>
              </div>
            )}
        </div>
        <div className='links'>
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </div>
      </header>
    );
  }
}

export default Header;

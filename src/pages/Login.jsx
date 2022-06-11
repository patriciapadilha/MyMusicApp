import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../css/Login.css';
import headphone from '../img/headphone.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.buttonLogin = this.buttonLogin.bind(this);

    this.state = {
      name: '',
      loginIsDisabled: true,
      loading: false,
    };
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateLogin());
  }

  validateLogin() {
    const { name } = this.state;
    const minCharacters = 3;
    if (name.length >= minCharacters) {
      this.setState({ loginIsDisabled: false });
    } else {
      this.setState({ loginIsDisabled: true });
    }
  }

  async buttonLogin() {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false });
    history.push('/search');
  }

  render() {
    const {
      name,
      loginIsDisabled,
      loading,
    } = this.state;

    return (
      <main className="container-main" data-testid="page-login">
        <img src={ headphone } alt="fone de ouvido azul"/>
        <label htmlFor="name-input">
          <input
            type="text"
            placeholder="Nome"
            id="name-input"
            name="name"
            data-testid="login-name-input"
            onChange={ this.onInputChange }
            value={ name }
          />
        </label>
        <button
          disabled={ loginIsDisabled }
          type="button"
          data-testid="login-submit-button"
          onClick={ this.buttonLogin }
          className="btn-1"
        >
          Entrar
        </button>
        {loading && <Loading /> }
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired }).isRequired,
};

export default Login;

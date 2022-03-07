import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();

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
      <div data-testid="page-login">
        Pagina Login
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
        >
          Entrar
        </button>
        { loading && <Loading /> }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired }).isRequired,
};

export default Login;

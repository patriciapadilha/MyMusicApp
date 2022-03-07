import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const {
      name,
      loginIsDisabled,
      onInputChange,
      buttonLogin,
    } = this.props;

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
            onChange={ onInputChange }
            value={ name }
          />
        </label>
        <button
          disabled={ loginIsDisabled }
          type="button"
          data-testid="login-submit-button"
          onClick={ buttonLogin }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string.isRequired,
  loginIsDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  buttonLogin: PropTypes.func.isRequired,
};

export default Login;

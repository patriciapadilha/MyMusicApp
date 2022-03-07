import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFount';
import { createUser } from './services/userAPI';
// import Loading from './components/Loading';

class App extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.buttonLogin = this.buttonLogin.bind(this);

    this.state = {
      name: '',
      loginIsDisabled: true,
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

  buttonLogin() {
    const { name } = this.state;
    createUser({ name });
  }

  render() {
    const {
      name,
      loginIsDisabled,
    } = this.state;
    return (
      // <p>TrybeTunes</p>
      <BrowserRouter>
        <Switch>
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/">
            <Login
              name={ name }
              loginIsDisabled={ loginIsDisabled }
              onInputChange={ this.onInputChange }
              buttonLogin={ this.buttonLogin }
            />
          </Route>
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <header data-testid="header-component">
        Header
        {loading ? <Loading />
          : (
            <p data-testid="header-user-name">
              { userName }
            </p>
          )}
      </header>
    );
  }
}

export default Header;

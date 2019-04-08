import React, { Component } from 'react';
import { connect } from 'react-redux';


class HeadshotScreen extends Component {

  render = () => {
    const { Layout, member, auth, memberLogout, onChangeMenu } = this.props;

    return <Layout member={member} auth={auth} logout={memberLogout} onChangeMenu={onChangeMenu} />;
  }
}


export default HeadshotScreen;

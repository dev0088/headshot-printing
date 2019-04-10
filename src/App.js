import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store';
import Routes from './routes/index';
import './App.css';

const history = createBrowserHistory();

const { store, persistor } = configureStore(history);

class App extends Component {
  state = {
    prevPath: ''
  }
  // getInitialState() {
  //   return { prevPath: '' }
  // }

  componentDidMount(){
    document.title = "Headshot Printing";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location })
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes />
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

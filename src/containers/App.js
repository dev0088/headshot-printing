import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '../store';
import Routes from '../routes/index';

import Productions from '../components/productions/Productions';
import Production from '../components/production/Production';
import ImageMapEditor from '../components/imagemap/ImageMapEditor';
import WorkflowEditor from '../components/workflow/WorkflowEditor';
import Title from './Title';
import HeadshotContainer from './template/HeadshotContainer';
import HeadshotImageEditorContainer from './template/HeadshotImageEditorContainer';

const history = createHistory();

const { store, persistor } = configureStore(history);

class App extends Component {
  state = {
    current: 'productions',
    selectedProductionId: 1
  }

  componentDidMount(){
    document.title = "Headshot";
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location })
    }
  }

  onChangeMenu = ({ key, productionId }) => {
    console.log('==== productionId: ', key, productionId);
    this.setState({
      current: key,
      selectedProductionId: productionId
    });
  }

  render() {
    const { current, selectedProductionId } = this.state;
    let currentPage = <div/>;
    if (current === 'imagemap') {
      currentPage = <ImageMapEditor key='imageMapEditor' onChangeMenu={this.onChangeMenu} />;
    } else if (current === 'workflow') {
      currentPage = <WorkflowEditor key={'workflowEdit'} />;
    } else if (current === 'productions') {
      currentPage = <Productions onChangeMenu={this.onChangeMenu} key="productions" />;
    } else if (current === 'production') {
      currentPage = <Production productionId={selectedProductionId} onChangeMenu={this.onChangeMenu} key="production" />;
    }

    return (
          (current === 'imagemap') ? (
            <HeadshotImageEditorContainer onChangeMenu={this.onChangeMenu}>
              <div className="rde-main">
                {/* <Helmet>
                  <meta charSet="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <link rel="manifest" href="./manifest.json" />
                  <link rel="shortcut icon" href="./favicon.ico" />
                  <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css" />
                  <title>React Design Editor</title>
                </Helmet> */}
                <div className="rde-content">
                  { currentPage }
                </div>
              </div>              
            </HeadshotImageEditorContainer>
          ) : (
            <HeadshotContainer onChangeMenu={this.onChangeMenu}>
              { currentPage }
            </HeadshotContainer>        
          )
    );
  }
}

export default App;

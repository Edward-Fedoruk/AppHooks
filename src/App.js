import React, { Component } from 'react'
import AppNavigation from './components/navigation/AppNavigation'
import { Link } from 'react-router-dom'
import { injectIntl, defineMessages } from "react-intl"
import arLocaleData from "react-intl/locale-data/ar"
import esLocaleData from "react-intl/locale-data/es"

const messages = defineMessages({
  title: {
    id: 'app.title',
    defaultMessage: 'Welcome to React'
  },
  content1: {
    id: 'app.content1',
    defaultMessage: 'To get started, edit'
  },
  content2: {
    id: 'app.content2',
    defaultMessage: 'and save to reload.'
  },
})

class App extends Component {
  render() {
    const { intl: { formatMessage,locale } } = this.props;
    return (
        <div className="App" style={{direction: locale ==="ar"? "rtl": "ltr"}}>
          <p className="App-intro">
            {formatMessage(messages.content1)} <code>src/App.js</code> {formatMessage(messages.content2)}
          </p>
        </div>
    );
  }
}

export default injectIntl(App);
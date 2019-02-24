import React from 'react'
import { connect } from 'react-redux'
import { startClock, serverRenderClock } from '../store'
import Web3Container from '../lib/Web3Container'
import Examples from '../components/examples'

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req
    reduxStore.dispatch(serverRenderClock(isServer))

    return {}
  }

  componentDidMount () {
    const { dispatch } = this.props
    this.timer = startClock(dispatch)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return <Web3Container
    renderLoading={() => <div>Loading Accounts Page...</div>}
    render={({ accounts }) => <Examples accounts={accounts} />}
    />
  }
}

export default connect()(Index)

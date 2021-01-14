import React, { Component } from 'react'

const Context = React.createContext()

class Provider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      autoSave: true,
    }
  }

  componentDidMount = () => {
    let autoSave = window.localStorage.getItem('inscribe.autoSave')
    if (autoSave !== undefined && autoSave !== null) {
      this.setState({
        autoSave: autoSave === 'true'
      })
    }
  }

  setAutoSave = (autoSave) => {
    this.setState({
      autoSave,
    })

    window.localStorage.setItem('inscribe.autoSave', autoSave)
    if (!autoSave) {
      window.localStorage.removeItem('inscribe.cachedText')
    }
    console.log(localStorage);
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          setAutoSave: this.setAutoSave,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export { Context, Provider }

export const Consumer = Context.Consumer
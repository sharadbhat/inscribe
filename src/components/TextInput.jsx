import React, { Component } from 'react'
import { Input, message } from 'antd'

// Utils
import { Context } from '../utils/Context'

// CSS
import '../App.css'

const { TextArea } = Input

class TextInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  componentDidMount = () => {
    let cachedText = localStorage.getItem('inscribe.cachedText')
    if (cachedText !== undefined && cachedText !== null && cachedText !== '') {
      this.context.setContent(cachedText)
      message.success('Content restored from browser storage!')
    }
    window.addEventListener('beforeunload', this.componentCleanup)
  }

  componentCleanup = () => {
    if (this.context.state.autoSave) {
      localStorage.setItem('inscribe.cachedText', this.context.state.content)
    }
  }

  componentWillUnmount = () => {
    this.componentCleanup()
    window.removeEventListener('beforeunload', this.componentCleanup)
  }

  updateText = newText => {
    this.context.setContent(newText.target.value)
  }

  render() {
    return (
      <div>
        <TextArea
          style={{ fontSize: '100px' }}
          placeholder='Start typing...'
          allowClear
          autoSize={{minRows: 26}}
          value={this.context.state.content}
          onChange={this.updateText}
        />
      </div>
    )
  }
}

TextInput.contextType = Context

export default TextInput

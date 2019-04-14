import React, { Component } from 'react';

import Styled from './styles';
import { MdClear } from 'react-icons/md'

export default class Feedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: (this.props.display) ? true : false
    }
    this.closeFeedback = this.closeFeedback.bind(this)
  }

  closeFeedback () {
    this.setState({
      open: false
    }, () => console.log('OPEN', this.state.open))
  }

  render() {
    return (
      <Styled color={this.props.type}>
        {this.props.type && <div>
          {this.props.message}
          <button className='icon-svg' onClick={this.props.func} onLoad={this.props.onload}>
            <MdClear size={20}></MdClear>
          </button>
        </div>}
      </Styled>
    );
  }
}

import React, { Component } from 'react';
import api from '../../services/api'

import logo from '../../assets/logo.svg'

import Styled from './styles'

export default class Main extends Component {
    state = {
        newBox: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const response = await api.post('/boxes', { title: this.state.newBox })
        this.props.history.push(`/box/${response.data._id}`)
    }

    handleInputChange = (e) => {
        this.setState({
            newBox: e.target.value
        })
    }

    render() {
        const { title } = this.state
        return (
            <Styled color='#FFF'>
                <form onSubmit={this.handleSubmit}>
                    <img src={logo} alt="" />
                    <input placeholder="Criar box" value={title} onChange={this.handleInputChange}></input>
                    <button type="submit">Criar</button>
                </form>
            </Styled>
        );
    }
}

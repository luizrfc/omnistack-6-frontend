import React, { Component } from 'react';
import api from '../../services/api'

import logo from '../../assets/logo.png'
import loader from '../../assets/loader-file.svg'

import Feedback from '../../componets/feedback'

import Styled from './styles'

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newBox: '',
            loader: false,
            feedback: {
                show: false,
                open: false,
                message: '',
                type: 'success',
                time: 2000
            }
        }
        this.updateInput = this.updateInput.bind(this)
        this.showFeedback = this.showFeedback.bind(this)
    }

    validate() {
        if (!this.state.newBox.length) {
            throw false
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        try {
            this.validate()
        } catch (error) {
            this.showFeedback('Digite um nome para sua Box', 'danger', false)
            return
        }

        this.updateInput(true)
        let response = await api.post('/boxes', { title: this.state.newBox })
        console.log('response', response)

        let message = (response.status === 200) ? 'Box gerado com sucesso!!!' : 'Houve um problema ao gerar o Box.'
        let type = (response.status === 200) ? 'success' : 'danger'
        this.showFeedback(message, type, true)

        setTimeout(() => {
            if(response.status === 200) this.props.history.push(`/box/${response.data._id}`)
        }, this.state.feedback.time)
    }

    updateInput = (value) => {
        this.setState({
            loader: value
        }, () => console.log('updateInput', this.state.loader))
    }

    async showFeedback(message, type, loader) {
        console.log('feedback', message, type, loader)
        await this.setState({
            ...this.state,
            loader: loader,
            feedback: {
                ...this.state.feedback,
                show: true,
                message: message,
                type: type,
            }
        }, () => console.log('showFeedback', this.state.feedback))
    }

    handleInputChange = (e) => {
        this.setState({
            newBox: e.target.value
        }, () => console.log('input', this.state.newBox.length))
    }

    render() {
        return (
            <Styled color='#FFF'>
                <form onSubmit={this.handleSubmit}>
                    <img src={logo} alt="" className='logo' />
                    <div>
                        <input placeholder="Criar box" value={this.state.newBox} onChange={this.handleInputChange} disabled={this.state.loader}></input>
                        {this.state.loader && <img src={loader} height='50' className='loader-svg' />}
                    </div>
                    <button type="submit" disabled={this.state.loader}>Criar</button>
                    <div className='list-box'>Lista de Box criados</div>
                </form>
                {this.state.feedback.show && <Feedback message={this.state.feedback.message} type={this.state.feedback.type}></Feedback>}
            </Styled>
        );
    }
}

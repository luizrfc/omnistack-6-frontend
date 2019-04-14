import React, { Component } from 'react';
import api from '../../services/api'

import logo from '../../assets/logo.png'
import loader from '../../assets/loader-file.svg'

import Feedback from '../../componets/feedback'
import NavSide from '../../componets/navSide'

import { MdMenu } from 'react-icons/md'

import Styled from './styles'

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newBox: '',
            box: [],
            loader: false,
            feedback: {
                show: false,
                open: false,
                message: '',
                type: 'success',
                time: 2000
            },
            navSide:{
                box: true,
                file: false
            }
        }
        this.updateInput = this.updateInput.bind(this)
        this.showFeedback = this.showFeedback.bind(this)
        this.hideFeedback = this.hideFeedback.bind(this)
        this.navSideControl = this.navSideControl.bind(this)
    }

    async componentWillMount(){
        let lstBox = await api.get('/boxes/all')
        console.log('lstBox', lstBox)
        this.setState({
            ...this.state,
            box: lstBox.data
        }, () => {
            this.closeNavSide()
        })
    }

    closeNavSide(){
        setTimeout(() => {
            this.navSideControl('box')
        }, 2000)
    }

    hideFeedback() {
        this.setState({
            ...this.state,
            feedback: {
                ...this.state.feedback,
                show: false
            }
        })
    }

    navSideControl = (nav) => {
        console.log('SIDE', nav)
        let sideBox = (nav === 'box') ? !this.state.navSide.box : false
        let sideFile = (nav === 'file') ? !this.state.navSide.file : false
        this.setState({
            ...this.state,
            navSide: {
                box: sideBox,
                file: sideFile
            }
        })
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

        let message = (response.status === 200) ? 'Box gerado com sucesso!!!' : 'Houve um problema ao gerar o Box.'
        let type = (response.status === 200) ? 'success' : 'danger'
        this.showFeedback(message, type, true)

        setTimeout(() => {
            if (response.status === 200) this.props.history.push(`/box/${response.data._id}`)
        }, this.state.feedback.time)
    }

    updateInput = (value) => {
        this.setState({
            loader: value
        })
    }

    async showFeedback(message, type, loader) {
        await this.setState({
            ...this.state,
            loader: loader,
            feedback: {
                ...this.state.feedback,
                show: true,
                message: message,
                type: type,
            }
        })
    }

    handleInputChange = (e) => {
        this.setState({
            newBox: e.target.value
        })
    }

    handleDelete = async (box) => {
        console.log('BOX', `/boxes/${box}`)
        let result = await api.delete(`/boxes/${box}`)
        console.log('delete === ', result)
        if(result.status === 200){
            let lstBox = this.state.box
            let indexBox = 0
            lstBox.map((item,index) => {
                if(item._id === box) indexBox = index
            })
            lstBox.splice(indexBox, 1)
            this.setState({
                ...this.state,
                box: lstBox
            })
            this.showFeedback('Box removido com sucesso', 'alert', false)
        }
    }

    render() {
        let { feedback, navSide } = this.state
        return (
            <Styled color='#FFF'>
                <button type="button" className='btn-action' onClick={() => this.navSideControl('box')}>
                    <MdMenu size={36}></MdMenu>
                </button>
                <form onSubmit={this.handleSubmit}>
                    <img src={logo} alt="" className='logo' />
                    <div>
                        <input placeholder="Criar box" value={this.state.newBox} onChange={this.handleInputChange} disabled={this.state.loader}></input>
                        {this.state.loader && <img src={loader} height='50' className='loader-svg' />}
                    </div>
                    <button type="submit" disabled={this.state.loader}>Criar</button>
                    {/* <button type="button" className='list-box' onClick={() => this.navSideControl('box')}>Lista de Box gerados</button> */}
                    {/* <button type="button" className='list-box' onClick={() => this.navSideControl('file')}>Lista de Arquivos</button> */}
                </form>

                <NavSide show={navSide.box} title='Box' data={this.state.box} delete={this.handleDelete} width='500px' url='/box/[id]' close={this.navSideControl} sideName='box'></NavSide>
                {/* <NavSide show={navSide.file} title='Arquivos enviados' data='' delete={false}></NavSide> */}

                {feedback.show && <Feedback message={feedback.message} type={feedback.type} func={this.hideFeedback} onload={this.hideTime}></Feedback>}
            </Styled>
        );
    }
}

import React, { Component } from 'react';

import { Styled, Mask } from './styles'
import { MdClose, MdSearch } from 'react-icons/md'
import { FaTrashAlt } from 'react-icons/fa'

import loader from '../../assets/loader.svg'

export default class navSide extends Component {
    constructor(props) {
        super(props)
        this.state = {
            change: false
        }
    }
    
    componentWillMount(){
        if(!this.props.show) {
            this.setState({
                change: true
            })
        }
    }

    componentDidUpdate() {
        if (this.props.show && !this.state.change) {
            this.setState({
                change: true
            }, console.log('UPDATE', this.state))
        }
    }

    linkData(id) {
        let url = this.props.url.replace('[id]', id)
        console.log('URL', url)
        window.location = url
    }

    render() {
        let { show, width, data, title, sideName } = this.props
        return (
            <Mask className={show ? 'show' : `${this.state.change && 'hide'}`}>
                <Styled className={show ? 'show' : `${this.state.change && !this.props.animate ? 'no-animate' : 'hide'}`} width={width}>
                    <div className='side-bar'>
                        <div className='title'>
                            <button type='button' onClick={() => this.props.close(sideName)}><MdClose size={24} className='btnClose'></MdClose></button>
                            {title}
                        </div>
                        {console.log('DATA', data)}
                        {data && data.length > 0 ? <ul className='side-ul'>
                            {data.map((box, index) => (
                                <li key={index}>
                                    <div className='nav-title'>{box.title}</div>
                                    {box.files.length > 0 &&
                                        <div className='nav-files' title='Arquivos'>
                                            {box.files.length < 10 ? `0${box.files.length}` :
                                                box.files.length > 99 ? '+99' : box.files.length} arquivos
                                        </div>
                                    }
                                    <div className='nav-info'>
                                        {this.props.delete && <div className='nav-delete' onClick={() => this.props.delete(box._id)}><FaTrashAlt size={20} color="#ec3811"></FaTrashAlt></div>}
                                        <div className='nav-numbers' onClick={() => this.linkData(box._id)}>
                                            <MdSearch size={24} color="#363636"></MdSearch>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul> : <div className='align-center loading-svg'>
                                <img src={loader} alt="" />
                            </div>}
                    </div>
                </Styled>
            </Mask>
        );
    }
}

import React, { Component } from 'react';

import { MdInsertDriveFile, MdMenu, MdChevronLeft } from 'react-icons/md'
import { FaTrashAlt, FaAngleLeft } from 'react-icons/fa'
import { distanceInWords } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Dropzone from 'react-dropzone'

import Styled from './styles';
import logo from '../../assets/logo.png'
import loader from '../../assets/loader.svg'
import loaderFile from '../../assets/loader-file.svg'
import api from '../../services/api'
import socket from 'socket.io-client'

import Feedback from '../../componets/feedback'
import NavSide from '../../componets/navSide'

export default class Box extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      loadingFile: false,
      box: {},
      feedback: {
        show: false,
        open: false,
        message: '',
        type: 'success',
        time: 2000,
        display: true
      },
      navSide: {
        box: false,
        file: false,
        data: []
      }
    }
    this.showFeedback = this.showFeedback.bind(this)
    this.hideFeedback = this.hideFeedback.bind(this)
    this.navSideControl = this.navSideControl.bind(this)
  }

  async showFeedback(message, type) {
    console.log('feedback', message, type)
    await this.setState({
      ...this.state,
      feedback: {
        ...this.state.feedback,
        show: true,
        message: message,
        type: type,
      }
    }, () => console.log('showFeedback', this.state.feedback))
  }

  closeNavSide() {
    setTimeout(() => {
      this.navSideControl('box')
    }, 2000)
  }

  navSideControl = (nav) => {
    console.log('SIDE', nav)
    let sideBox = (nav === 'box') ? !this.state.navSide.box : false
    let sideFile = (nav === 'file') ? !this.state.navSide.file : false
    this.setState({
      ...this.state,
      navSide: {
        ...this.state.navSide,
        box: sideBox,
        file: sideFile
      }
    })
  }

  hideTime() {
    console.log('****HIDE****')
    setTimeout(() => {
      this.hideFeedback()
    }, 3000)
  }

  hideFeedback() {
    this.setState({
      ...this.state,
      feedback: {
        ...this.state.feedback,
        show: false
      }
    }, () => console.log('showFeedback', this.state.feedback))
  }

  async componentWillMount() {
    const box = this.props.match.params.id
    const response = await api.get(`boxes/${box}`)
    console.log('response', response)
    this.setState({
      ...this.state,
      loading: false,
      box: response.data
    })

    let lstBox = await api.get('/boxes/all')
    console.log('lstBox', lstBox)
    this.setState({
      ...this.state,
      navSide: {
        ...this.state.navSide,
        box: false,
        data: lstBox.data
      }
    })
  }

  async componentDidMount() {
    this.subscribeToNewFiles()
  }

  subscribeToNewFiles = () => {
    const box = this.props.match.params.id
    const io = socket('https://lricardo-omni-backend.herokuapp.com')

    io.emit('connectRoom', box)

    io.on('file', data => {
      console.log('IO => ', data)

      this.showFeedback('Arquivo adicionado com sucesso', 'success')

      this.setState({
        ...this.state,
        loadingFile: false,
        box: {
          ...this.state.box,
          files: [
            data,
            ...this.state.box.files,
          ]
        }
      })
    })
  }

  handleUpload = files => {
    this.setState({ loadingFile: true })
    files.forEach(file => {
      const data = new FormData()
      const box = this.props.match.params.id

      data.append('file', file)

      let result = api.post(`boxes/${box}/files`, data)
      console.log('result upload', result)
    })
  }

  handleRemove = async (fileId) => {
    let result = await api.delete(`files/${fileId}`)
    if (result.status === 200) {
      let fileIndex = 0
      this.showFeedback('Arquivo removido com sucesso', 'alert')
      let files = this.state.box.files
      files.map((item, index) => {
        if (item._id === fileId) fileIndex = index
      })
      files.splice(fileIndex, 1)
      this.setState({
        ...this.state,
        box: {
          ...this.state.box,
          files: files
        }
      })
    } else {
      this.showFeedback('Não foi possível remover o arquivo', 'danger')
    }
  }

  btnBack = () => {
    this.props.history.push(`/`)
  }

  render() {
    let { loading, box, feedback, navSide } = this.state
    return (
      <Styled>
        <button onClick={this.btnBack} className='btn-action left'><MdChevronLeft size={36}></MdChevronLeft></button>
        <button onClick={() => this.navSideControl('box')} className='btn-action right'><MdMenu size={36}></MdMenu></button>

        <header>
          <div className='hero'>
            <img src={logo} alt="" className='logo' />
            {!loading && <h1>{box.title}</h1>}
          </div>
        </header>

        {!loading &&
          <Dropzone onDropAccepted={this.handleUpload}>
            {({ getRootProps, getInputProps }) => (
              <div className="upload" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Arreste arquivos para esta área ou clique aqui!!!</p>
              </div>
            )}
          </Dropzone>}

        {!loading &&
          <ul>
            {this.state.loadingFile && <li>
              <img src={loaderFile} height='50' className='loader-svg' />
            </li>}
            {box.files && box.files.map((file, index) => (
              <li key={index}>
                <div className='file-info'>
                  <a className='fileInfo' href={file.url} target="_new">
                    <MdInsertDriveFile size={24} color="#008bd4"></MdInsertDriveFile>
                    <strong>{file.title}</strong>
                  </a>
                </div>

                <div className='file-delete' onClick={() => this.handleRemove(file._id)}><FaTrashAlt size={20} color="#ec3811"></FaTrashAlt></div>
                <div className='file-date'>há {distanceInWords(file.createdAt, new Date(), { locale: pt })}</div>
              </li>
            ))}
            {box.files && box.files.length === 0 && <li className='nothing'>
              Não há registros a exibir
            </li>
            }

          </ul>}

        {loading && <div className='align-center loading-svg'>
          <img src={loader} alt="" />
        </div>}

        <NavSide show={navSide.box} title='Box' data={navSide.data} animate={false} width='500px' url='/box/[id]' close={this.navSideControl} sideName='box'></NavSide>

        {feedback.show && <Feedback message={feedback.message} type={feedback.type} func={this.hideFeedback} onload={this.hideTime}></Feedback>}
      </Styled >
    );
  }
}

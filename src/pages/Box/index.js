import React, { Component } from 'react';

import { MdInsertDriveFile } from 'react-icons/md'
import { distanceInWords, format } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Dropzone from 'react-dropzone'

import './styles.css';
import logo from '../../assets/logo.svg'
import loader from '../../assets/loader.svg'
import api from '../../services/api'
import socket from 'socket.io-client'

export default class Box extends Component {
  state = {
    loading: true,
    box: {}
  }

  async componentWillMount() {
    const box = this.props.match.params.id
    const response = await api.get(`boxes/${box}`)
    console.log('response', response)
    this.setState({
      loading: false,
      box: response.data
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
      this.setState({
        ...this.state,
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
    files.forEach(file => {
      const data = new FormData()
      const box = this.props.match.params.id

      data.append('file', file)

      let result = api.post(`boxes/${box}/files`, data)
      console.log('result upload', result)
    })
  }

  render() {
    let { loading, box } = this.state
    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="" />
          {!loading && <h1>{box.title}</h1>}
        </header>

        <Dropzone onDropAccepted={this.handleUpload}>
          {({ getRootProps, getInputProps }) => (
            <div className="upload" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Arreste arquivos para esta área ou clique aqui!!!</p>
            </div>
          )}
        </Dropzone>

        {!loading &&
          <ul>

            {box.files && box.files.map((file, index) => (
              <li key={index}>
                <a className='fileInfo' href={file.url} target="_blank">
                  <MdInsertDriveFile size={24} color="#A5CFFF"></MdInsertDriveFile>
                  <strong>{file.title}</strong>
                </a>

                <span>há {distanceInWords(file.createdAt, new Date(), { locale: pt })}</span>
              </li>
            ))}

          </ul>}

        {loading && <div className='align-center'>
          <img src={loader} alt="" />
        </div>}
      </div >
    );
  }
}

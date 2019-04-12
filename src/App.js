import React, { Component } from 'react';
import './App.css';

import Routes from './routes'

// tipo 1
const App = () => <Routes />

// tipo 2
// function App () {
//   return <Main></Main>
// }

// tipo 3
// class App extends Component {
//   render() {
//     return (
//       <Main></Main>
//     );
//   }
// }

export default App;

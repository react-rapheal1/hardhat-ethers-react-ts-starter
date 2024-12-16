import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './index.css';
import { getProvider } from './utils/provider';

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getProvider}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


// How to connect a Dapp to the blockchain via Metamask
// How to read account data from the blockchain via Metamask
// How to cryptographically sign digital messages via Metamask
// How to deploy a new instance of a smart contract via Metamask
// How to read and write data to and from the deployed smart contract

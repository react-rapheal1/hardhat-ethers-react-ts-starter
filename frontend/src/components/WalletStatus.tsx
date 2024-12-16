import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Provider } from '../utils/provider';

type CleanupFunction = (() => void) | undefined;

const StyledWalletStatusDiv = styled.div`
   display: flex;
   fontweight: 400;
  flex-direction: column;
  gap: 15px; /* Space between items */
`;

const StyledStatusIcon = styled.h1`
  margin: 0px;
`;

function ChainId(): ReactElement {
  const { chainId } = useWeb3React<Provider>();

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
           <span style={{display: 'flex', fontFamily: 'Arial, Helvetica, sans-serif'}}>
        <strong >Chain Id :</strong>
      </span>
      <span role="img" aria-label="chain">
        ⛓
      </span>
      <span style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: 'red'}}>
        {chainId ?? ''}</span>
    </div>
  );
}

function BlockNumber(): ReactElement {
  const { chainId, library } = useWeb3React<Provider>();

  const [blockNumber, setBlockNumber] = useState<number>();

  useEffect((): CleanupFunction => {
    if (!library) {
      return;
    }

    let stale = false;

    async function getBlockNumber(library: Provider): Promise<void> {
      try {
        const blockNumber: number = await library.getBlockNumber();

        if (!stale) {
          setBlockNumber(blockNumber);
        }
      } catch (error: any) {
        if (!stale) {
          setBlockNumber(undefined);
        }

        window.alert(
          'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
      }
    }

    getBlockNumber(library);

    library.on('block', setBlockNumber);

    // cleanup function
    return (): void => {
      stale = true;
      library.removeListener('block', setBlockNumber);
      setBlockNumber(undefined);
    };
  }, [library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <span style={{ fontWeight: 'bold' }}>
    Block Number
  </span>
  <span role="img" aria-label="numbers" style={{ marginLeft: '5px' }}>
    🔢
  </span>
  <span style={{ marginLeft: '10px',  color: 'red' }}>
    {blockNumber === null ? 'Error' : blockNumber ?? ''}
  </span>
    </div>
  );
}

function Account(): ReactElement {
  const { account } = useWeb3React<Provider>();

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <span>
        <strong>Account</strong>
      </span>
      <span role="img" aria-label="robot">
        🤖
      </span>
      <span style={{ color: 'red' }}>
        {typeof account === 'undefined'
          ? ''
          : account
          ? `${account.substring(0, 6)}...${account.substring(
              account.length - 4
            )}`
          : ''}
      </span>
    </div>
  );
}

function Balance(): ReactElement {
  const { account, library, chainId } = useWeb3React<Provider>();

  const [balance, setBalance] = useState<ethers.BigNumber>();

  useEffect((): CleanupFunction => {
    if (typeof account === 'undefined' || account === null || !library) {
      return;
    }

    let stale = false;

    async function getBalance(
      library: Provider,
      account: string
    ): Promise<void> {
      const balance: ethers.BigNumber = await library.getBalance(account);

      try {
        if (!stale) {
          setBalance(balance);
        }
      } catch (error: any) {
        if (!stale) {
          setBalance(undefined);

          window.alert(
            'Error!' + (error && error.message ? `\n\n${error.message}` : '')
          );
        }
      }
    }

    getBalance(library, account);

    // create a named balancer handler function to fetch the balance each block. in the
    // cleanup function use the fucntion name to remove the listener
    const getBalanceHandler = (): void => {
      getBalance(library, account);
    };

    library.on('block', getBalanceHandler);

    // cleanup function
    return (): void => {
      stale = true;
      library.removeListener('block', getBalanceHandler);
      setBalance(undefined);
    };
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <span>
        <strong>Balance</strong>
      </span>
      <span role="img" aria-label="gold">
        💰
      </span>
      <span style={{ color: 'red' }}>
        {balance === null
          ? 'Error'
          : balance
          ? `Ξ${Math.round(+ethers.utils.formatEther(balance) * 1e4) / 1e4}`
          : ''}
      </span>
    </div>
  );
}

// nonce: aka 'transaction count'
function NextNonce(): ReactElement {
  const { account, library, chainId } = useWeb3React<Provider>();

  const [nextNonce, setNextNonce] = useState<number>();

  useEffect((): CleanupFunction => {
    if (typeof account === 'undefined' || account === null || !library) {
      return;
    }

    let stale = false;

    async function getNextNonce(
      library: Provider,
      account: string
    ): Promise<void> {
      const nextNonce: number = await library.getTransactionCount(account);

      try {
        if (!stale) {
          setNextNonce(nextNonce);
        }
      } catch (error: any) {
        if (!stale) {
          setNextNonce(undefined);

          window.alert(
            'Error!' + (error && error.message ? `\n\n${error.message}` : '')
          );
        }
      }
    }

    getNextNonce(library, account);

    // create a named next nonce handler function to fetch the next nonce each block.
    // in the cleanup function use the fucntion name to remove the listener
    const getNextNonceHandler = (): void => {
      getNextNonce(library, account);
    };

    library.on('block', getNextNonceHandler);

    // cleanup function
    return (): void => {
      stale = true;
      setNextNonce(undefined);
    };
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <span>
        <strong>Next Nonce</strong>
      </span>
      <span role="img" aria-label="gold">
        #️⃣
      </span >
      <span style={{ color: 'red' }}>{nextNonce === null ? 'Error' : nextNonce ?? ''}</span>
    </div>
  );
}

function StatusIcon(): ReactElement {
  const { active, error } = useWeb3React<Provider>();

  return (
    <StyledStatusIcon>{active ? '🟢' : error ? '🔴' : '🟠'}</StyledStatusIcon>
  );
}

export function WalletStatus(): ReactElement {
  return (
    <StyledWalletStatusDiv>
      <ChainId />
      <BlockNumber />
      <Account />
      <Balance />
      <NextNonce />
      {/*
      <StatusIcon /> */}
    </StyledWalletStatusDiv>
  );
}

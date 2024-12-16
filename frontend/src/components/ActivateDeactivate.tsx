import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError
} from '@web3-react/injected-connector';
import { MouseEvent, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { injected } from '../utils/connectors';
import { useEagerConnect, useInactiveListener } from '../utils/hooks';
import { Provider } from '../utils/provider';

type ActivateFunction = (
  connector: AbstractConnector,
  onError?: (error: Error) => void,
  throwErrors?: boolean
) => Promise<void>;

function getErrorMessage(error: Error): string {
  let errorMessage: string;

  switch (error.constructor) {
    case NoEthereumProviderError:
      errorMessage = `No Ethereum browser extension detected. Please install MetaMask extension.`;
      break;
    case UnsupportedChainIdError:
      errorMessage = `You're connected to an unsupported network.`;
      break;
    case UserRejectedRequestError:
      errorMessage = `Please authorize this website to access your Ethereum account.`;
      break;
    default:
      errorMessage = error.message;
  }

  return errorMessage;
}

const StyledActivateDeactivateDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  place-self: center;
  align-items: center;
  padding-top: 30px;
`;

// Fantastic Activate Button
const StyledActivateButton = styled.button`
  width: 150px;
  height: 2.5rem; /* Slightly taller for better visual balance */
  border-radius: 1.5rem; /* More rounded for a modern look */
  background: linear-gradient(90deg, #32cd32, #2e8b57); /* Gradient effect */
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border: none; /* Removes border for a cleaner look */
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(50, 205, 50, 0.3); /* Adds subtle shadow */
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1); /* Slight zoom effect */
    box-shadow: 0px 8px 12px rgba(50, 205, 50, 0.5); /* Bigger shadow on hover */
  }

  &:active {
    transform: scale(0.95); /* Pressed-in effect */
    box-shadow: 0px 2px 4px rgba(50, 205, 50, 0.2); /* Reduces shadow on click */
  }
`;

// Fantastic Deactivate Button
const StyledDeactivateButton = styled.button`
  width: 150px;
  height: 2.5rem;
  border-radius: 1.5rem;
  background: linear-gradient(90deg, #ff6347, #dc143c); /* Gradient effect */
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(255, 99, 71, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 8px 12px rgba(255, 99, 71, 0.5);
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 0px 2px 4px rgba(255, 99, 71, 0.2);
  }
`;

function Activate(): ReactElement {
  const context = useWeb3React<Provider>();
  const { activate, active } = context;

  const [activating, setActivating] = useState<boolean>(false);

  function handleActivate(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    async function _activate(activate: ActivateFunction): Promise<void> {
      setActivating(true);
      await activate(injected);
      setActivating(false);
    }

    _activate(activate);
  }

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has
  // granted access already
  const eagerConnectionSuccessful = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider,
  // if it exists
  useInactiveListener(!eagerConnectionSuccessful);

  return (
    <StyledActivateButton
      disabled={active}
      style={{
        cursor: active ? 'not-allowed' : 'pointer',
        borderColor: activating ? 'orange' : active ? 'unset' : 'green'
      }}
      onClick={handleActivate}
    >
      Connect
    </StyledActivateButton>
  );
}

function Deactivate(): ReactElement {
  const context = useWeb3React<Provider>();
  const { deactivate, active } = context;

  function handleDeactivate(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    deactivate();
  }

  return (
    <StyledDeactivateButton
      disabled={!active}
      style={{
        cursor: active ? 'pointer' : 'not-allowed',
        borderColor: active ? 'red' : 'unset'
      }}
      onClick={handleDeactivate}
    >
      Disconnect
    </StyledDeactivateButton>
  );
}

export function ActivateDeactivate(): ReactElement {
  const context = useWeb3React<Provider>();
  const { error } = context;

  if (!!error) {
    window.alert(getErrorMessage(error));
  }

  return (
    <StyledActivateDeactivateDiv>
      <Activate />
      <Deactivate />
    </StyledActivateDeactivateDiv>
  );
}

import { useWeb3React } from '@web3-react/core';
import { MouseEvent, ReactElement } from 'react';
import styled from 'styled-components';
import { Provider } from '../utils/provider';

const StyledButton = styled.button`
  width: 150px;
  height: 2.5rem; /* Slightly taller for better visual balance */
  border-radius: 1.5rem; /* More rounded for a modern look */
  background: linear-gradient(90deg,rgb(39, 104, 218),rgb(227, 154, 28)); /* Gradient effect */
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border: none; /* Removes border for a cleaner look */
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(50, 205, 50, 0.3); /* Adds subtle shadow */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  place-self: center;
`;

export function SignMessage(): ReactElement {
  const context = useWeb3React<Provider>();
  const { account, active, library } = context;

  function handleSignMessage(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    if (!library || !account) {
      window.alert('Wallet not connected');
      return;
    }

    async function signMessage(
      library: Provider,
      account: string
    ): Promise<void> {
      try {
        const signature = await library.getSigner(account).signMessage('👋');
        window.alert(`Success!\n\n${signature}`);
      } catch (error: any) {
        window.alert(
          'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
      }
    }

    signMessage(library, account);
  }

  return (
    <StyledButton
      disabled={!active ? true : false}
      style={{
        cursor: !active ? 'not-allowed' : 'pointer',
        borderColor: !active ? 'unset' : 'blue'
      }}
      onClick={handleSignMessage}
    >
      Sign Message
    </StyledButton>
  );
}

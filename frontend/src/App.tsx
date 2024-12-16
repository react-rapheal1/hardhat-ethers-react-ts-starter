import { ReactElement } from 'react';
import styled from 'styled-components';
import { WebCardComponent } from './components/Card';
import { NavbarComponent } from './components/NavBar';


const StyledAppDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh; /* Full viewport height to center vertically */
 background-color: #000000; /* Optional: Add a background color for better contrast */
`;

export function App(): ReactElement {
  return (
    <StyledAppDiv>
      <NavbarComponent />
      <WebCardComponent />
    </StyledAppDiv>
  );
}


// Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
// Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
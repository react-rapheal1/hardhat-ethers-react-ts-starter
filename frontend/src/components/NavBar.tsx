import styled from "styled-components";
import React from "react";
import { useWeb3React } from '@web3-react/core';
import { ReactElement } from 'react';
import { Provider } from '../utils/provider';


// Navbar styling
export const Navbar = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  background-color: #000000;
  color: white;
  position: fixed; /* Makes it stick to the top */
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    font-style: oblique;
  }

  .nav-links {
    display: flex;
    gap: 20px;
  }


    &:hover {
      color: #f0f0f0;
    }
  }
`;

const StyledStatusIcon = styled.h1`
  margin: 0px;
`;

function StatusIcon(): ReactElement {
  const { active, error } = useWeb3React<Provider>();

  return (
    <StyledStatusIcon>{active ? '🟢' : error ? '🔴' : '🟠'}</StyledStatusIcon>
  );
}

export function NavbarComponent() {
    return (
      <Navbar>
        <div className="logo">
          <h3>Decentralized App</h3>
        </div>

        <StatusIcon />
      </Navbar>
    );
  }
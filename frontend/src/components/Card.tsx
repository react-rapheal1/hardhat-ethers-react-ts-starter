import styled from 'styled-components';
import { ActivateDeactivate } from './ActivateDeactivate';
import { WalletStatus } from './WalletStatus';
import { Greeter } from './Greeter';
import { SignMessage } from './SignMessage';
import { DeployContract } from './DeployContract';


export const WebCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 250px;
  margin: 20px;
  padding: 20px;
  border-radius: 12px;
  background-color: #f0f0f0f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Creates 4 equal columns */
  gap: 20px; /* Adds spacing between cards */
  justify-items: center; /* Centers cards horizontally */
  margin: 20px; /* Adds margin around the container */
`;

export function WebCardComponent() {
  return (
    <CardContainer>
      <WebCard>
                <div>
                    <p style={{ fontSize: '1.5rem', color: 'black', marginBottom: '10px', fontWeight: 'bold'}}>View Client Details</p>
                    <WalletStatus />
                </div>
                </WebCard>
                <WebCard>
                <div>
                <p style={{ fontSize: '1.5rem', color: 'black', marginBottom: '10px', fontWeight: 'bold'}}>Activation Buttons</p>
                <ActivateDeactivate/> 
                </div>
            </WebCard>
                <WebCard>
                <div>
                <p style={{ fontSize: '1.5rem', color: 'black', marginBottom: '10px', fontWeight: 'bold'}}>Smart Contract Portal</p>
                <Greeter/>
                </div>
            </WebCard>
            <WebCard>
    
            <div style={{display: 'flex', flexDirection: 'column', alignContent: 'center', gap: '30px'}}>
                <p style={{ fontSize: '1.5rem', color: 'black', marginBottom: '10px', fontWeight: 'bold'}}>Deploy & Sign Smart Contract</p>
                <SignMessage/>
                <DeployContract/>
            </div>
            </WebCard>
    </CardContainer>
  );
}




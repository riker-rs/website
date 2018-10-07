import styled from 'styled-components'

export const Button = styled.button`
  border-radius: 8px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 3px rgba(0,0,0,.2);
  color: #fff;
  font-weight: bold;
  background: #0EDC69;
  background: ${props => props.primary ? '#0EDC69' : 'transparent'};
  border: ${props => props.primary ? 'none' : '1px solid #fff'};
  padding: 8px 16px;
`

import styled from 'styled-components'

const buttonStyle = `
  border-radius: 8px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 3px rgba(0,0,0,.2);
  color: #fff;
  font-weight: bold;
  background: #0EDC69;
  padding: 8px 16px;
  transition-duration: .3s;
  &:hover {
    box-shadow: 0 8px 36px rgba(5, 10, 30, 0.3);
    transform: translateY(-3px);
  }
`

export const StyledButton = styled.button`
  ${buttonStyle}
  background: ${props => props.primary ? '#0EDC69' : 'transparent'};
  border: ${props => props.primary ? 'none' : '1px solid #fff'};
`

export const StyledButtonLink = styled.a`
  ${buttonStyle}
  text-decoration: none;
  background: ${props => props.primary ? '#0EDC69' : 'transparent'};
  border: ${props => props.primary ? 'none' : '1px solid #fff'};
`

export const IconWrapper = styled.span``

export const ButtonLabel = styled.span``
import styled from 'styled-components';

export default styled.a`
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  ${props => props.secondary && `
    font-size: 15px;
  `}
`
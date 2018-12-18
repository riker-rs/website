import styled from 'styled-components';

export default styled.a`
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  ${props => props.secondary && `
    font-size: 15px;
  `}
`

export const ExternalLinkWithIcon = styled.a`
  align-items: center;
  display: flex;
  opacity: .95;
  position: relative;
  transition-duration: .3s;
  &:after {
    content: "";
    background: #fff;
    display: block;
    height: 1px;
    width: 0%;
    opacity: 0;
    transition-duration: .3s;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin :auto;
  }
  & > * {
    transition-duration: .3s;
    &:last-child {
      transition-delay: .075s;
    }
  }
  &:hover {
    opacity: 1;
    &:after {
      width: 100%;
      opacity: 1;
    }
    & > * {
      transform: translateY(-3px);
    }
  }
  & > span {
    color: #fff;
    font-size: 15px;
    margin-left: 8px;
    text-decoration: none;
  }
  @media screen and (max-width: 400px) {
    & > span {
      display: none;
    }
  }
`
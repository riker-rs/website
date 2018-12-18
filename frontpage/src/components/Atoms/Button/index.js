import React from 'react'
import {StyledButton, StyledButtonLink, IconWrapper, ButtonLabel} from './styled.js'

export const Button = ({children, primary, secondary}) => {
  return (
    <StyledButton primary={primary} secondary={secondary}>
      {children}
    </StyledButton>
  )
}

export const ButtonLink = (props) => (<StyledButtonLink {...props} />)
  

export const ButtonLinkWithIcon = ({icon, label}) => (
  <ButtonLink>
    <IconWrapper>{icon}</IconWrapper>
    <ButtonLabel>{label}</ButtonLabel>
  </ButtonLink>
)

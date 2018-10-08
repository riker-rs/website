import React from 'react'
import {StyledButton, StyledButtonLink} from './styled.js'

export const Button = ({children, primary, secondary}) => {
  return (
    <StyledButton primary={primary} secondary={secondary}>
      {children}
    </StyledButton>
  )
}

export const ButtonLink = (props) => {
  return (
    <StyledButtonLink {...props} />
  )
}
import React from 'react'
import {Button} from './styled.js'

const _Button = ({children, primary, secondary}) => {
  return (
    <Button primary={primary} secondary={secondary}>
      {children}
    </Button>
  )
}

export default _Button
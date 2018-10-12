import React from 'react'
import Logo from './Riker.png'
import WhiteLogo from './RikerWhite.png'
import {Image} from './styled.js'

const Riker = ({white}) => {
  return (
    white
      ? <Image src={WhiteLogo} />
      : <Image src={Logo} />
  )
}

export default Riker
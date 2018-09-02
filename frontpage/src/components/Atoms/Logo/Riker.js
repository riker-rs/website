import React from 'react'
import Logo from './Riker.png'
import WhiteLogo from './RikerWhite.png'

const Riker = ({white}) => {
  return (
    <div>
      {
        white
        ? <img src={WhiteLogo} />
        : <img src={Logo} />
      }
    </div>
  )
}

export default Riker
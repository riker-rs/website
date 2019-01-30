import React from 'react'
import Image from './Bullet.png'

const Bullet = ({bulletSrc}) => {
  return (
    <div>
      <img src={bulletSrc || Image} />
    </div>
  )
}

export default Bullet
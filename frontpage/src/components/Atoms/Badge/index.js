import React from 'react'

const Badge = ({url, src}) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <img src={src} alt="" />
  </a>
)


export default Badge
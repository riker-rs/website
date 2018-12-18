import React from 'react'

const Badge = ({url, src}) => (
  <a href={url} target="_blank">
    <img src={src} role="presentation" />
  </a>
)


export default Badge
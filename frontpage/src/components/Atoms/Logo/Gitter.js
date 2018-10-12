import React from 'react'
import styled from 'styled-components'

const Size = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  & > svg {
    width: 100%;
  }
  display: flex;
  align-items: center;
`

const Gitter = ({size}) => {
  return (
    <Size size={size}>
      <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6,0 L9.38998342,0 L9.38998342,22.372808 L6,22.372808 L6,0 Z M26.6102872,5.42370282 L30,5.42370282 L30,22.372808 L26.6102872,22.372808 L26.6102872,5.42370282 Z M12.9152955,5.42370282 L16.3050083,5.42370282 L16.3050083,35.3221386 L12.9152955,35.3221386 L12.9152955,5.42370282 Z M19.6949917,5.42370282 L23.0849751,5.42370282 L23.0849751,35.3221386 L19.6949917,35.3221386 L19.6949917,5.42370282 Z"
          fill="#FFFFFF"
          fillRule="nonzero"
        />
      </svg>
    </Size>
  )
}

export default Gitter

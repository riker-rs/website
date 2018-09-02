import React from 'react'
import {Wrapper, Container, MainImage, Headline} from './styled'
import Image from './MainVisual.png'

const MainVisual = () => {
  return (
    <Wrapper>
      <Container>
        <MainImage src={Image} />
        <Headline>A framework for building modern, concurrent and resilient applications</Headline>
      </Container>
    </Wrapper>
  )
}

export default MainVisual
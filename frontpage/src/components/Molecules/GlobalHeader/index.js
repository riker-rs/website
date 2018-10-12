import React from 'react'
import RikerLogo from '../../Atoms/Logo/Riker'
import {Wrapper, RikerWrapper, HeaderBrandText} from './styled'
import ExternalLink from '../../Atoms/Link/ExternalLink'

const GlobalHeader = () => {
  return (
    <Wrapper>
      <RikerWrapper>
        <RikerLogo white />
        <HeaderBrandText>Riker</HeaderBrandText>
      </RikerWrapper>
      <nav>
        <ExternalLink href="/actors/">Get Started</ExternalLink>
      </nav>
    </Wrapper>
  )
}

export default GlobalHeader
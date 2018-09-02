import React from 'react'
import RikerLogo from '../../Atoms/Logo/Riker'
import GithubLogo from '../../Atoms/Logo/Github'
import {Wrapper, RikerWrapper, HeaderBrandText} from './styled'

const GlobalHeader = () => {
  return (
    <Wrapper>
      <RikerWrapper>
        <RikerLogo white />
        <HeaderBrandText>Riker</HeaderBrandText>
      </RikerWrapper>
      <GithubLogo />
    </Wrapper>
  )
}

export default GlobalHeader
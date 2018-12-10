import React from 'react'
import RikerLogo from '../../Atoms/Logo/Riker'
import {Wrapper, RikerWrapper, HeaderBrandText, Nav} from './styled'
import {ExternalLinkWithIcon} from '../../Atoms/Link/ExternalLink'
import GithubLogo from '../../Atoms/Logo/Github'
import GitterLogo from '../../Atoms/Logo/Gitter'


const GlobalHeader = () => {
  return (
    <Wrapper>
      <RikerWrapper>
        <RikerLogo white />
        <HeaderBrandText>Riker</HeaderBrandText>
      </RikerWrapper>
      <Nav>
        <ExternalLinkWithIcon secondary href="https://github.com/riker-rs/riker/" target="_blank" rel="noopener noreferrer">
          <GithubLogo size={18}/> <span>View on GitHub</span>
        </ExternalLinkWithIcon>
        <ExternalLinkWithIcon secondary href="https://gitter.im/riker-rs/Lobby" target="_blank" rel="noopener noreferrer">
          <GitterLogo size={18}/> <span>Chat on Gitter</span>
        </ExternalLinkWithIcon>
      </Nav>
    </Wrapper>
  )
}

export default GlobalHeader
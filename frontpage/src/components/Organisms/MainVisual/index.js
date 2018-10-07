import React from 'react'
import {Wrapper, Container, MainImage, Headline, ButtonWrapper, RepositoryWrapper} from './styled'
import Image from './MainVisual.png'
import GithubLogo from '../../Atoms/Logo/Github'
import ExternalLink from '../../Atoms/Link/ExternalLink'
import Button from '../../Atoms/Button'

const MainVisual = () => {
  return (
    <Wrapper>
      <Container>
        <MainImage src={Image} />
        <Headline>A Rust framework for building modern, concurrent and resilient applications</Headline>
        <ButtonWrapper>
          <Button primary={"1"}>Get Started</Button>
          <Button>FAQ</Button>
        </ButtonWrapper>
        <ExternalLink secondary href="https://github.com/riker-rs/riker/" target="_blank" rel="noopener noreferrer">
          <RepositoryWrapper>
            <GithubLogo size={18}/> <span>View on GitHub</span>
          </RepositoryWrapper>
        </ExternalLink>
        <ExternalLink secondary href="https://gitter.im/riker-rs/Lobby" target="_blank" rel="noopener noreferrer">
          <RepositoryWrapper>
          <GithubLogo size={18}/> <span>Chat on Gitter</span>
          </RepositoryWrapper>
        </ExternalLink>
      </Container>
    </Wrapper>
  )
}

export default MainVisual
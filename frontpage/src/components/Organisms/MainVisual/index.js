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
        <Headline>A framework for building modern, concurrent and resilient applications</Headline>
        <ButtonWrapper>
          <Button primary={"1"}>Get started</Button>
          <Button>FAQ</Button>
        </ButtonWrapper>
        <ExternalLink secondary href="https://github.com/riker-rs/riker/" target="_blank" rel="noopener noreferrer">
          <RepositoryWrapper>
            <GithubLogo size={18}/> <span>Repository</span>
          </RepositoryWrapper>
        </ExternalLink>
      </Container>
    </Wrapper>
  )
}

export default MainVisual
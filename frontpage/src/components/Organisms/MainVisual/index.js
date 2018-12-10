import React from 'react'
import {Wrapper, Container, MainImage, Headline, ButtonWrapper, RepositoryWrapper} from './styled'
import Image from './MainVisual.png'
import GithubLogo from '../../Atoms/Logo/Github'
import GitterLogo from '../../Atoms/Logo/Gitter'
import ExternalLink from '../../Atoms/Link/ExternalLink'
import {ButtonLink} from '../../Atoms/Button'

const MainVisual = () => {
  return (
    <Wrapper>
      <Container>
        <MainImage src={Image} />
        <Headline>A Rust framework for building modern, concurrent and resilient applications</Headline>
        <ButtonWrapper>
          <ButtonLink href="/actors/" primary={"1"}>Get Started</ButtonLink>
          <ButtonLink href="/faq/">FAQ</ButtonLink>
        </ButtonWrapper>
      </Container>
    </Wrapper>
  )
}

export default MainVisual
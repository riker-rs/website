import React from 'react'
import {Wrapper, Container, MainImage, Headline, ButtonWrapper, ListBadges} from './styled'
import Image from './MainVisual.png'
import {ButtonLink} from '../../Atoms/Button'
import Badge from '../../Atoms/Badge'

const badges = [
  {
    badgeUrl: 'https://travis-ci.org/riker-rs/riker',
    badgeSrc: 'https://camo.githubusercontent.com/1a83234a219d856e921a700b2ebdf8ba356bf717/68747470733a2f2f7472617669732d63692e6f72672f72696b65722d72732f72696b65722e7376673f6272616e63683d6d6173746572'
  },
  {
    badgeUrl: 'https://github.com/riker-rs/riker/blob/master/LICENSE',
    badgeSrc: 'https://camo.githubusercontent.com/890acbdcb87868b382af9a4b1fac507b9659d9bf/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c75652e737667'
  },
  {
    badgeUrl: 'https://crates.io/crates/riker',
    badgeSrc: 'https://camo.githubusercontent.com/d3deca4fa64f3ef0c5ae26693702af602e39d984/68747470733a2f2f6d6572697462616467652e6865726f6b756170702e636f6d2f72696b6572'
  },
  {
    badgeUrl: 'https://docs.rs/riker',
    badgeSrc: 'https://camo.githubusercontent.com/bcbb8118f4482a5a0d73e8772479ec5b5b17f250/68747470733a2f2f646f63732e72732f72696b65722f62616467652e737667'
  }
]

const MainVisual = () => {
  return (
    <Wrapper>
      <Container>
        <MainImage src={Image} />
        <Headline>A Rust framework for building modern, concurrent and resilient applications</Headline>
        <ListBadges>
          {badges.map((badge, index) => <Badge key={index} url={badge.badgeUrl} src={badge.badgeSrc} />)}
        </ListBadges>
        <ButtonWrapper>
          <ButtonLink href="/actors/" primary={"1"}>Get Started</ButtonLink>
          <ButtonLink href="/faq/">FAQ</ButtonLink>
        </ButtonWrapper>
      </Container>
    </Wrapper>
  )
}

export default MainVisual
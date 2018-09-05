import React from 'react'
import Link from 'gatsby-link'
import {
  LayoutHeader,
  Section,
  ContentsGrid,
  Footer,
  TimeLineWrapper,
  TimeLineBullet,
  TimeLineBulletList
} from './styled'
import GlobalHeader from '../components/Molecules/GlobalHeader'
import MainVisual from '../components/Organisms/MainVisual'
import Content from '../components/Molecules/Content'
import SectionHeader from '../components/Molecules/SectionHeader'
import {TypeBodyLevel1Center, TypeBoldItalic, Copyright} from '../components/styledTypography'
import {Spacer} from '../components/styledUtils'

const IndexPage = () => (
  <div>
    <LayoutHeader>
      <GlobalHeader />
    </LayoutHeader>
    <MainVisual />
    <Section>
      <Spacer size={72} />
      <SectionHeader header='Why Riker'/>
      <Spacer size={40} />
      <TypeBodyLevel1Center>We believe there is no greater need than now for a full-featured actor model implementation that scales to hundreds or thousands of microservices and that equally can run exceptionally well on resource limited hardware to drive drones, IoT and robotics. The Rust language makes this possible.</TypeBodyLevel1Center>
      <Spacer size={72} />
      <ContentsGrid>
        <Content
          header='Actor Based Concurrency'
          body='Actors are lightweight abstractions that make it easier to develop concurrent software. Actors expose an API via messaging resulting in fast, non-blocking code execution while also eliminating race conditions to make concurrent code a breeze to write.'
        />
        <Content
          header='Resilient & Self Healing'
          body='Build applications that isolate and recover from failures. Actors provide a Supervision Strategy that form the core of resilient application design in Riker.'
        />
        <Content
          header='Event Sourcing & CQRS'
          body='Use event sourcing and Command Query Responsibility Separation (CQRS) to drive extremely fast persistent data applications.'
        />
        <Content
          header='Modern'
          body='Scale Microservices to hundreds of instances, or run high performance drone systems on limited hardware. Riker applications compile to OS binaries (thanks to Rust), have no VM overhead, and require only a few megabytes of memory to run.'
        />
      </ContentsGrid>
    </Section>
    <Section >
      <Spacer size={72} />
      <SectionHeader header='Roadmap'/>
      <Spacer size={72} />
      <TimeLineWrapper>
        <TimeLineBullet>
          <TimeLineBulletList>
            <TypeBoldItalic>Remote actors</TypeBoldItalic>
          </TimeLineBulletList>
          <TimeLineBulletList>
            <TypeBoldItalic>Support for TCP and UDP</TypeBoldItalic>
          </TimeLineBulletList>
          <TimeLineBulletList>
            <TypeBoldItalic>Support for TCP and UDP</TypeBoldItalic>
          </TimeLineBulletList>
          <TimeLineBulletList>
            <TypeBoldItalic>Distributed data (CRDTs)</TypeBoldItalic>
          </TimeLineBulletList>
        </TimeLineBullet>
      </TimeLineWrapper>
    </Section>
    <Spacer size={72} />
    <Footer>
      <Copyright>&copy;Riker</Copyright>
    </Footer>
    <Spacer size={72} />
  </div>
)

export default IndexPage

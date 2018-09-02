import React from 'react'
import Link from 'gatsby-link'
import {
  LayoutHeader,
  Section,
  ContentsGrid,
  Footer,
  TimeLineBullet,
  TimeLineBulletList
} from './styled'
import GlobalHeader from '../components/Molecules/GlobalHeader'
import MainVisual from '../components/Organisms/MainVisual'
import Content from '../components/Molecules/Content'
import SectionHeader from '../components/Molecules/SectionHeader'
import {TypeBodyLevel1Center} from '../components/styledTypography'

const IndexPage = () => (
  <div>
    <LayoutHeader>
      <GlobalHeader />
    </LayoutHeader>
    <MainVisual />
    <Section>
      <SectionHeader header='Why Riker'/>
      <TypeBodyLevel1Center>We believe there is no greater need than now for a full-featured actor model implementation that scales to hundreds or thousands of microservices and that equally can run exceptionally well on resource limited hardware to drive drones, IoT and robotics. The Rust language makes this possible.</TypeBodyLevel1Center>
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
    <Section>
      <SectionHeader header='Roadmap'/>
      <TimeLineBullet>
        <TimeLineBulletList>Remote actors</TimeLineBulletList>
        <TimeLineBulletList>Support for TCP and UDP</TimeLineBulletList>
        <TimeLineBulletList>Support for TCP and UDP</TimeLineBulletList>
        <TimeLineBulletList>Distributed data (CRDTs)</TimeLineBulletList>
      </TimeLineBullet>
    </Section>
    <Footer>&copy;Riker</Footer>
  </div>
)

export default IndexPage

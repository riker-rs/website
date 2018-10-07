import React from 'react'
import Link from 'gatsby-link'
import {
  Wrapper,
  LayoutHeader,
  Section,
  SectionContainer,
  ContentsGrid,
  Footer,
  TimeLineWrapper,
  TimeLineBullet,
  TimeLineBulletList,
  Pre,
  LineNo
} from '../styled'
import GlobalHeader from '../components/Molecules/GlobalHeader'
import MainVisual from '../components/Organisms/MainVisual'
import Content from '../components/Molecules/Content'
import SectionHeader from '../components/Molecules/SectionHeader'
import {TypeBodyLevel1Center, TypeBoldItalic, Copyright} from '../components/styledTypography'
import {Spacer} from '../components/styledUtils'
import Highlight, { defaultProps } from "prism-react-renderer"
import theme from 'prism-react-renderer/themes/nightOwl'

const exampleCode = `struct MyActor;

impl Actor for MyActor {
    type Msg = String;

    fn receive(&mut self,
                ctx: &Context<Self::Msg>,
                msg: Self::Msg,
                sender: ActorRef<Self::Msg>) {

        println!("received {}", msg);
    }
}`;

const IndexPage = () => (
  <Wrapper>
    <LayoutHeader>
      <GlobalHeader />
    </LayoutHeader>
    <MainVisual />
    <Section bg={'#F1F3F5'}>
      <SectionContainer>
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
          <Content
            header='Event Sourcing & CQRS'
            body='Use event sourcing and Command Query Responsibility Separation (CQRS) to drive extremely fast persistent data applications.'
          />
          <Content
            header='Modern'
            body='Scale Microservices to hundreds of instances, or run high performance drone systems on limited hardware. Riker applications compile to OS binaries (thanks to Rust), have no VM overhead, and require only a few megabytes of memory to run.'
          />
        </ContentsGrid>
      </SectionContainer>
      <Spacer size={120} />
    </Section>
    <Section >
      <SectionContainer>
        <Spacer size={72} />
        <SectionHeader header='Code'/>
        <Spacer size={72} />
        <Highlight {...defaultProps} theme={theme} code={exampleCode} language="jsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  <LineNo>{i + 1}</LineNo>
                  {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                </div>
              ))}
            </Pre>
          )}
        </Highlight>
      </SectionContainer>
      <Spacer size={160} />
    </Section>
    <Footer>
      <Copyright>&copy;Riker</Copyright>
    </Footer>
  </Wrapper>
)

export default IndexPage

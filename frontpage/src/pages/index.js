import React from 'react'
import {
  Wrapper,
  LayoutHeader,
  Section,
  SectionContainer,
  ContentsGrid,
  Footer,
  Pre,
  LineNo
} from '../styled'
import Layout from '../components/Layout'
import GlobalHeader from '../components/Molecules/GlobalHeader'
import MainVisual from '../components/Organisms/MainVisual'
import Content from '../components/Molecules/Content'
import SectionHeader from '../components/Molecules/SectionHeader'
import {Copyright} from '../components/styledTypography'
import {Spacer} from '../components/styledUtils'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import IconConccurent from '../Components/Atoms/Icons/icon-cuncurrent.png'
import IconEventSoursing from '../Components/Atoms/Icons/icon-event-sourcing.png'
import IconGeneral from '../Components/Atoms/Icons/icon-general.png'
import IconModern from '../Components/Atoms/Icons/icon-modern.png'
import IconModular from '../Components/Atoms/Icons/icon-modular.png'
import IconSelfHeal from '../Components/Atoms/Icons/icon-self-heal.png'

const exampleCode = `struct MyActor;

impl Actor for MyActor {
    type Msg = String;

    fn receive(&mut self,
                ctx: &Context<Self::Msg>,
                msg: Self::Msg,
                sender: ActorRef<Self::Msg>) {

        println!("received {}", msg);
    }
}

let sys = ActorSystem::new(&model).unwrap();

let props = MyActor::props();
let a = sys.actor_of(props, "a").unwrap();

a.tell("Hello actor!".to_string(), None);
`;

const IndexPage = () => (
  <Layout>
    <Wrapper>
      <LayoutHeader>
        <GlobalHeader />
      </LayoutHeader>
      <MainVisual />
      <Section bg={'#F1F3F5'}>
        <SectionContainer>
          <Spacer size={30} />
          <ContentsGrid>
            <Content
              bulletSrc={IconConccurent}
              header='Actor Based Concurrency'
              body='Actors expose a message based API resulting in fast, non-blocking code execution while also eliminating race conditions to make concurrent code a breeze to write.'
            />
            <Content
              bulletSrc={IconSelfHeal}
              header='Self Healing'
              body='Build applications that isolate and recover from failures. Actors provide a Supervision Strategy that form the core of resilient application design in Riker.'
            />
            <Content
              bulletSrc={IconEventSoursing}
              header='Event Sourcing & CQRS'
              body='Use event sourcing and Command Query Responsibility Separation (CQRS) to drive extremely fast persistent data applications.'
            />
            <Content
              bulletSrc={IconGeneral}
              header='General Purpose'
              body='In the Cloud, Microservices, IoT, Drones, AI and more. Rust compiles to OS binaries, has no VM or GC overhead, and requires only a few megabytes of memory.'
            />
            <Content
              bulletSrc={IconModular}
              header='Modular Framework'
              body='Default thread management, concurrent logging, message scheduling and data persistence are included and can be switched for alternative implementations.'
            />
            <Content
              bulletSrc={IconModern}
              header='Modern Rust Design'
              body='Execute Rust Futures with ease and no unsafe code used.'
            />
          </ContentsGrid>
        </SectionContainer>
        <Spacer size={80} />
      </Section>
      <Section >
        <SectionContainer>
          <Spacer size={20} />
          <SectionHeader header='Example Code'/>
          <Spacer size={24} />
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
        <Copyright>&copy; Riker 2019</Copyright>
      </Footer>
    </Wrapper>
  </Layout>
)

export default IndexPage

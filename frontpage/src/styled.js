import styled from 'styled-components'

export const Wrapper = styled.div`
  overflow: hidden;
`

export const LayoutHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding-top: .5rem;
  max-width: 1200px;
  width: 96%;
`

export const Section = styled.section`
  position: relative;
  &::after {
    background: ${props => props.bg || '#fff'};
    position: absolute;
    display: block;
    content: ' ';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transform-origin: left;
    transform: skewY(-7deg);
  }
`

export const SectionContainer = styled.div`
  margin: auto;
  max-width: 1000px;
  width: 96%;
`

export const ContentsGrid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const Footer = styled.div`
  color: #fff;
  font-size: 12px;
  font-style: italic;
  position: relative;
  p {
    position: absolute;
    right: 4%;
    bottom: 16px;
  }
  &::after {
    background-image: linear-gradient(150deg, #2F0070 0%, #10D2FB 100%);
    position: absolute;
    display: block;
    content: ' ';
    top: 0;
    left: 0;
    width: 100%;
    height: 400px;
    z-index: -1;
    transform-origin: left;
    transform: skewY(-7deg);
  }
`

export const TimeLineWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const TimeLineBullet = styled.ul`
  margin: auto;
`

export const TimeLineBulletList = styled.li``
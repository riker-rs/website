import styled from 'styled-components'

export const Wrapper = styled.div`
  background-image: linear-gradient(150deg, #2F0070 0%, #10D2FB 100%);
  position: relative;
  z-index: -1;
`

export const Container = styled.div`
  max-width: 1000px;
  width: 96%;
  margin: auto;
`

export const Headline = styled.p`
  font-family: Lato-Black;
  font-size: 48px;
  color: #FFFFFF;
  letter-spacing: 0.7px;
  line-height: 64px;
  width: 320px;
  padding: 88px 0;
`

export const MainImage = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  max-width: 90%;
  max-height: 96%;
  width: auto;
  height: auto;
`
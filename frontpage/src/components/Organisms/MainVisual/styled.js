import styled from 'styled-components'

export const Wrapper = styled.div`
  background-image: linear-gradient(150deg, #2F0070 0%, #10D2FB 100%);
  position: relative;
  z-index: 0;
`

export const Container = styled.div`
  max-width: 1000px;
  width: 96%;
  margin: auto;
  padding: 120px 0;
`

export const Headline = styled.p`
  font-family: Lato;
  font-weight: 700;
  font-size: 30px;
  color: #FFFFFF;
  letter-spacing: 0.7px;
  line-height: 36px;
  margin-bottom: 20px;
  width: 540px;
  position: relative;
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

export const ButtonWrapper = styled.div`
  display: flex;
  width: 210px;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
`

export const RepositoryWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  & > span {
    margin-left: 8px;
  }
`


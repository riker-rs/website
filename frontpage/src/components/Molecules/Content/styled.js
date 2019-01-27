import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 48%;
  padding-bottom: 72px;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`

export const ContentHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`

export const ContentBody = styled.div`
  padding-left: 48px;
`

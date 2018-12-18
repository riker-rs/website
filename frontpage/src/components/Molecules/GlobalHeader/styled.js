import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
`

export const RikerWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
`

export const HeaderBrandText = styled.span`
  font-style: italic;
  padding-left: .5rem;
  color: #fff;
` 

export const Nav = styled.nav`
  display: flex;
  font-weight: bold;
  > * {
    margin-left: 1em;
    &:first-child {
      margin-left: 0;
    }
  }
`


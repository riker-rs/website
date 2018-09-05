import React from 'react'
import Bullet from '../../Atoms/Bullet'
import {Wrapper, ContentHeaderWrapper, ContentHeader, ContentBody} from './styled'
import {IconWrapper, Spacer} from '../../styledUtils'
import {TypeBoldHeadingLevel2} from '../../styledTypography'

const Content = ({header, body}) => {
  return (
    <Wrapper>
      <ContentHeaderWrapper>
        <IconWrapper size={32}>
          <Bullet />
        </IconWrapper>
        <Spacer size={8} />
        <TypeBoldHeadingLevel2>{header}</TypeBoldHeadingLevel2>
      </ContentHeaderWrapper>
      <Spacer size={24} />
      <ContentBody>{body}</ContentBody>
    </Wrapper>
  )
}

export default Content
import React from 'react'
import Bullet from '../../Atoms/Bullet'
import {Wrapper, ContentHeaderWrapper, ContentBody} from './styled'
import {IconWrapper, Spacer} from '../../styledUtils'
import {TypeBoldHeadingLevel2} from '../../styledTypography'

const Content = ({header, body, bulletSrc}) => {
  return (
    <Wrapper>
      <ContentHeaderWrapper>
        <IconWrapper size={40}>
          <Bullet bulletSrc={bulletSrc}/>
        </IconWrapper>
        <Spacer size={8} />
        <TypeBoldHeadingLevel2>{header}</TypeBoldHeadingLevel2>
      </ContentHeaderWrapper>
      <Spacer size={8} />
      <ContentBody>{body}</ContentBody>
    </Wrapper>
  )
}

export default Content
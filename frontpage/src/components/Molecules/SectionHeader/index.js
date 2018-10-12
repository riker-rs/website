import React from 'react'
import {TypeBoldHeadingLevel1} from '../../styledTypography'
import Bullet from '../../Atoms/Bullet'
import {Wrapper} from './styled'
import {IconWrapper, Spacer} from '../../styledUtils'

const SectionHeader = ({header}) => {
  return (
    <Wrapper>
      <IconWrapper size={40}>
        <Bullet />
      </IconWrapper>
      <Spacer size={8} />
      <TypeBoldHeadingLevel1>{header}</TypeBoldHeadingLevel1>
    </Wrapper>
  )
}

export default SectionHeader
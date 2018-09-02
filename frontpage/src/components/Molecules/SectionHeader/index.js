import React from 'react'
import {TypeBoldHeadingLevel1} from '../../styledTypography'
import Bullet from '../../Atoms/Bullet'

const SectionHeader = ({header}) => {
  return (
    <div>
      <Bullet />
      <TypeBoldHeadingLevel1>{header}</TypeBoldHeadingLevel1>
    </div>
  )
}

export default SectionHeader
import React from 'react'
import Bullet from '../../Atoms/Bullet'
import {ContentHeaderWrapper, ContentHeader, ContentBody} from './styled'

const Content = ({header, body}) => {
  return (
    <div>
      <ContentHeaderWrapper>
        <Bullet />
        <ContentHeader>{header}</ContentHeader>
      </ContentHeaderWrapper>
      <ContentBody>{body}</ContentBody>
    </div>
  )
}

export default Content
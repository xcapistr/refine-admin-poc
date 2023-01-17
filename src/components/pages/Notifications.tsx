import React from 'react'
import { IResourceComponentsProps, BaseRecord } from '@pankod/refine-core'
import { Typography, Divider } from '@pankod/refine-antd'

const { Title, Paragraph } = Typography

export const Notifications: React.FC<IResourceComponentsProps> = () => {
  return (
    <>
      <Title level={4}>Notifications</Title>
      <Divider />
      <Paragraph>This is custom page.</Paragraph>{' '}
    </>
  )
}

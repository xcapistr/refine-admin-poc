import React from 'react'
import { IResourceComponentsProps, useShow } from '@pankod/refine-core'
import {
  Show,
  Typography,
  TagField,
  TextField,
  Space,
  ShowButton,
  EditButton,
  Divider,
  DeleteButton,
  Table
} from '@pankod/refine-antd'

const { Title } = Typography

const dataSource = [
  {
    key: '1',
    affiliate: 'Pedro Pascal',
    referred: 'Bella Ramsey',
    status: 'Accepted'
  },
  {
    key: '1',
    affiliate: 'Pedro Pascal',
    referred: 'John ASdsad',
    status: 'Complete'
  }
]

const columns = [
  {
    title: 'Referring affiliate',
    dataIndex: 'affiliate',
    key: 'affiliate'
  },
  {
    title: 'Referred user',
    dataIndex: 'referred',
    key: 'referred'
  },
  {
    title: 'Status of referral',
    dataIndex: 'status',
    key: 'status'
  }
]

export const User: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const record = data?.data

  return (
    <Show isLoading={isLoading}>
      <Title level={4}>{record?.user?.fullName}</Title>
      <TextField value={`full name: ${record?.user?.fullName}`} />
      <br />
      <TextField value={`email: ${record?.user?.email}`} />
      <br />
      <TextField value={`zip: ${record?.user?.zipCode}`} />
      <br />
      <Divider />
      <br />
      <Title level={5}>Referrals</Title>
      <Table dataSource={dataSource} columns={columns} />
      <br />
      <Space>
        <EditButton />
        <DeleteButton />
      </Space>
    </Show>
  )
}

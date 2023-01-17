import React from 'react'
import { IResourceComponentsProps, BaseRecord } from '@pankod/refine-core'
import {
  useTable,
  List,
  Table,
  Space,
  TagField,
  EmailField,
  DateField,
  TextField,
  ShowButton,
  DeleteButton,
  EditButton
} from '@pankod/refine-antd'

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true
  })

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="fullName" title="Full Name" />
        <Table.Column
          dataIndex={['email']}
          title="Email"
          render={(value: any) => <EmailField value={value} />}
        />
        <Table.Column
          dataIndex={['zipCode']}
          title="Zip Code"
          render={(value: any) => <TextField value={value} />}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText recordItemId={record.id} />
              <EditButton hideText />
            </Space>
          )}
        />
      </Table>
    </List>
  )
}

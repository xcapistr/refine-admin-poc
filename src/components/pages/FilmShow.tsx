import React from 'react'
import { IResourceComponentsProps, useShow } from '@pankod/refine-core'
import { Show, Typography, TagField, TextField } from '@pankod/refine-antd'

const { Title } = Typography

export const FilmShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const record = data?.data

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{record?.film?.title}</Title>
      <TextField
        value={new Date(record?.film?.releaseDate).toLocaleDateString()}
      />
      <br />
      <TextField value={`directed by ${record?.film?.director}`} />
    </Show>
  )
}

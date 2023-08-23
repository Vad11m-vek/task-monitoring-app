import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Alert, Popconfirm, Table, Tag, Tooltip, message } from 'antd'
import { useRouter } from 'next/router'
import { ColumnType } from 'antd/lib/table'

import {
  useDeleteDomainMutation,
  useGetDomainsQuery,
} from '@common/api/domainApi/domain.api'
import { IExtendedDomain } from '@common/api/domainApi/domain.api.types'
import StreetsBlock from '@common/components/DashboardPage/blocks/streets'
import { AppRoutes } from '@utils/constants'

export interface Props {
  domainId?: string
}

const DomainsTable: React.FC<Props> = ({ domainId }) => {
  const router = useRouter()
  const isOnPage = router.pathname === AppRoutes.DOMAIN

  const { data, isLoading, isError } = useGetDomainsQuery({ domainId })

  const [deleteDomain, { isLoading: deleteLoading }] = useDeleteDomainMutation()

  const handleDelete = async (id: string) => {
    const response = await deleteDomain(id)
    if ('data' in response) {
      message.success('Видалено!')
    } else {
      message.error('Помилка при видаленні')
    }
  }

  if (isError) return <Alert message="Помилка" type="error" showIcon closable />

  return (
    <Table
      rowKey="_id"
      size="small"
      pagination={
        !isOnPage && {
          responsive: false,
          size: 'small',
          pageSize: 8,
          position: ['bottomCenter'],
          hideOnSinglePage: true,
        }
      }
      loading={isLoading}
      columns={getDefaultColumns(handleDelete, deleteLoading)}
      expandable={{
        expandedRowRender: ({ _id: domainId }) => (
          <StreetsBlock domainId={domainId} />
        ),
      }}
      dataSource={data}
      scroll={{ x: 600 }}
    />
  )
}

const getDefaultColumns = (
  handleDelete?: (...args: any) => void,
  deleteLoading?: boolean
): ColumnType<any>[] => [
  {
    fixed: 'left',
    title: 'Назва',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: 'Адміністратори',
    dataIndex: 'adminEmails',
    render: (adminEmails) =>
      adminEmails.map((email) => <Tag key={email}>{email}</Tag>),
  },
  {
    align: 'center',
    title: 'Опис',
    dataIndex: 'description',
    width: 100,
    render: (text) => (
      <Tooltip title={text}>
        <QuestionCircleOutlined />
      </Tooltip>
    ),
  },
  {
    align: 'center',
    fixed: 'right',
    title: '',
    dataIndex: '',
    width: 50,
    render: (_, domain: IExtendedDomain) => (
      <Popconfirm
        title={`Ви впевнені що хочете видалити ${domain.name ?? 'цей домен'}?`}
        onConfirm={() => handleDelete(domain?._id)}
        cancelText="Відміна"
        disabled={deleteLoading}
      >
        <DeleteOutlined />
      </Popconfirm>
    ),
  },
]

export default DomainsTable
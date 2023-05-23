import {
  useDeleteStreetMutation,
  useGetAllStreetsQuery,
} from '@common/api/streetApi/street.api'
import StreetsCardHeader from '@common/components/UI/StreetsCardHeader'
import TableCard from '@common/components/UI/TableCard'
import { IStreet } from '@common/modules/models/Street'
import { Table, Popconfirm, message } from 'antd'
import cn from 'classnames'
import { DeleteOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import s from './style.module.scss'
import { AppRoutes } from '@utils/constants'

const StreetsBlock = () => {
  const { data: streets, isLoading } = useGetAllStreetsQuery({})
  const router = useRouter()
  const [deleteStreet, { isLoading: deleteLoading, isError: deleteError }] =
    useDeleteStreetMutation()

  const handleDeleteStreet = async (id: string) => {
    const response = await deleteStreet(id)
    if ('data' in response) {
      message.success('Видалено!')
    } else {
      message.error('Помилка при видаленні рахунку')
    }
  }

  const columns = [
    {
      title: 'Назва',
      dataIndex: 'address',
    },
    {
      title: '',
      dataIndex: '',
      width: '10%',
      render: (_, street: IStreet) => (
        <div className={s.popconfirm}>
          <Popconfirm
            title={`Ви впевнені що хочете видалити вулицю ${street.address}?`}
            onConfirm={() => handleDeleteStreet(street?._id)}
            cancelText="Відміна"
            disabled={deleteLoading}
          >
            <DeleteOutlined className={s.icon} />
          </Popconfirm>
        </div>
      ),
    },
  ]

  const {
    pathname,
    //query: { email },
  } = router
  return (
    <TableCard
      title={<StreetsCardHeader />}
      className={cn({ [s.noScroll]: pathname === AppRoutes.STREETS })}
    >
      <Table
        loading={isLoading}
        dataSource={streets}
        columns={columns}
        pagination={{
          responsive: false,
          size: 'small',
          pageSize: 5,
          position: ['bottomCenter'],
          hideOnSinglePage: true,
        }}
      />
    </TableCard>
  )
}

export default StreetsBlock
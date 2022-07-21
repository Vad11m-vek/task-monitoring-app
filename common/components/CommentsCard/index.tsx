import { useState } from 'react'
import { SendOutlined } from '@ant-design/icons'
import { Card, List, Button, Input } from 'antd'
import Comment from './comment'
import { useGetUserByEmailQuery } from 'common/api/userApi/user.api'
import {
  useGetTaskByIdQuery,
  useAddCommentMutation,
} from 'common/api/taskApi/task.api'
import { useSession } from 'next-auth/react'
import s from './style.module.scss'

interface Props {
  taskId: any
  loading?: boolean
}

const CommentsCard: React.FC<Props> = ({ taskId, loading = false }) => {
  const session = useSession()
  const { data: sessionUser } = useGetUserByEmailQuery(
    session?.data?.user?.email
  )

  const { data: task } = useGetTaskByIdQuery(taskId, {
    skip: !taskId,
  })

  const [addComment] = useAddCommentMutation()
  const [input, setInput] = useState<string>('')

  const handleAddTask = async () => {
    if (!input.trim()) return

    await addComment({
      _id: task?.data?._id,
      comment: [
        {
          id: sessionUser?.data?._id,
          text: input,
        },
      ],
    })
    setInput('')
  }

  return (
    <Card loading={loading} className={s.Card} title="Comments">
      <List
        className={s.List}
        dataSource={task?.data?.comment}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <Comment comment={item} />
          </List.Item>
        )}
      />

      <div className={s.Input}>
        <Input
          placeholder="Type your comment here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          type="primary"
          onClick={handleAddTask}
          icon={<SendOutlined />}
        />
      </div>
    </Card>
  )
}

export default CommentsCard
import { useRouter } from 'next/router'
import { AppRoutes } from '../../../utils/constants'
import { Button } from 'antd'
import s from './style.module.scss'

const Verify: React.FC = () => {
  const router = useRouter()

  return (
    <div>
      <h2 className={s.Header}>Verify your E-Mail</h2>
      <p className={s.Text}>
        We have sent you a message by email.
        <br />
        Please verify your email by following the instructions in the message.
      </p>

      <div className={s.Buttons}>
        <Button
          type="primary"
          size="large"
          style={{ width: '100px' }}
          onClick={() => {
            // TODO: redirect to user email page
          }}
        >
          Verify
        </Button>

        <div className={s.Divider} />

        <Button
          type="primary"
          ghost
          size="large"
          style={{ width: '100px' }}
          onClick={() => router.push(AppRoutes.INDEX)}
        >
          Return
        </Button>
      </div>
    </div>
  )
}

export default Verify

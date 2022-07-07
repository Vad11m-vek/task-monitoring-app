import { FC } from 'react'
import { useRouter } from 'next/router'
import styles from './style.module.scss'

const Verify: FC = () => {
  const router = useRouter()

  // TODO: some logic (HZ KAK SDELAT)

  return (
    <div>
      <h2 className={styles.Header}>Verify tour E-Mail</h2>
      <p className={styles.Text}>
        We have sent you a message by email.
        <br />
        Please verify your email by following the instructions in the message.
      </p>
    </div>
  )
}

export default Verify
import { IPaymentField } from '@common/api/paymentApi/payment.api.types'
import { ServiceType } from '@utils/constants'
import {
  Cleaning,
  Custom,
  Discount,
  Electricity,
  GarbageCollector,
  Inflicion,
  Maintenance,
  Placing,
  Water,
  WaterPart,
} from './sum'

const components = {
  [ServiceType.Cleaning]: Cleaning,
  [ServiceType.Custom]: Custom,
  [ServiceType.Discount]: Discount,
  [ServiceType.Electricity]: Electricity,
  [ServiceType.GarbageCollector]: GarbageCollector,
  [ServiceType.Inflicion]: Inflicion,
  [ServiceType.Maintenance]: Maintenance,
  [ServiceType.Placing]: Placing,
  [ServiceType.Water]: Water,
  [ServiceType.WaterPart]: WaterPart,
}

export const SumComponent: React.FC<{
  record: IPaymentField & { key: string }
}> = ({ record }) => {
  if (record && record.type in components) {
    return components[record.type]({ record })
  }
  // return <Unknown record={record} />
}

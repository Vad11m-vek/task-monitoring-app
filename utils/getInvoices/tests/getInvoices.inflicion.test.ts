import { IPayment } from '@common/api/paymentApi/payment.api.types'
import { IRealestate } from '@common/api/realestateApi/realestate.api.types'
import { IService } from '@common/api/serviceApi/service.api.types'
import { expect } from '@jest/globals'
import { ServiceType } from '@utils/constants'
import { getInvoices } from '@utils/getInvoices'

describe('getInvoices - INFLICION', () => {
  it('should load Inflicion from payment', () => {
    const company: Partial<IRealestate> = {}
    const service: Partial<IService> = {}
    const payment: Partial<IPayment> = {
      invoice: [
        {
          type: ServiceType.Inflicion,
          lastAmount: 0,
          amount: 10,
          price: 100,
          sum: 100,
        },
      ],
    }
    const prevPayment: Partial<IPayment> = {}

    const invoices = getInvoices({
      company,
      service,
      payment,
      prevPayment,
    })

    expect(invoices).toContainEqual(payment.invoice[0])
  })

  it('should load Inflicion from company with inflicion', () => {
    const company: Partial<IRealestate> = {
      inflicion: true,
    }
    const service: Partial<IService> = {
      inflicionPrice: 101,
    }
    const payment: Partial<IPayment> = {}
    const prevPayment: Partial<IPayment> = {
      invoice: [{ type: ServiceType.Placing, price: 100, sum: 100 }],
    }

    const invoices = getInvoices({
      company,
      service,
      payment,
      prevPayment,
    })

    const targetPrice =
      ((service.inflicionPrice - 100) / 100) * prevPayment.invoice[0].sum

    expect(invoices).toContainEqual({
      type: ServiceType.Inflicion,
      price: targetPrice,
      sum: targetPrice,
    })
  })

  it('should NOT load Inflicion from company without inflicion', () => {
    const company: Partial<IRealestate> = {}
    const service: Partial<IService> = {
      inflicionPrice: 101,
    }
    const payment: Partial<IPayment> = {}
    const prevPayment: Partial<IPayment> = {}

    const invoices = getInvoices({
      company,
      service,
      payment,
      prevPayment,
    })

    expect(invoices).not.toContainEqual(
      expect.objectContaining({ type: ServiceType.Inflicion })
    )
  })
})
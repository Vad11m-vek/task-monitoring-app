import { IPayment } from '@common/api/paymentApi/payment.api.types'
import { IRealestate } from '@common/api/realestateApi/realestate.api.types'
import { IService } from '@common/api/serviceApi/service.api.types'
import { expect } from '@jest/globals'
import { ServiceType } from '@utils/constants'
import { getInvoices } from '@utils/getInvoices'

describe('getInvoices - GARBAGE-COLLECTOR', () => {
  it('should load GarbageCollector from payment', () => {
    const company: Partial<IRealestate> = {}
    const service: Partial<IService> = {}
    const payment: Partial<IPayment> = {
      invoice: [
        {
          type: ServiceType.GarbageCollector,
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

  it('should NOT load GarbageCollector from company without garbageCollector', () => {
    const company: Partial<IRealestate> = {}
    const service: Partial<IService> = {
      garbageCollectorPrice: 123,
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
      expect.objectContaining({ type: ServiceType.GarbageCollector })
    )
  })

  it('should load GarbageCollector from company with garbageCollector', () => {
    const company: Partial<IRealestate> = {
      garbageCollector: true,
      servicePricePerMeter: 200,
    }
    const service: Partial<IService> = {
      garbageCollectorPrice: 123,
    }
    const payment: Partial<IPayment> = {}
    const prevPayment: Partial<IPayment> = {}

    const invoices = getInvoices({
      company,
      service,
      payment,
      prevPayment,
    })

    const targetPrice =
      (company.servicePricePerMeter * service.garbageCollectorPrice) / 100

    expect(invoices).toContainEqual({
      type: ServiceType.GarbageCollector,
      price: targetPrice,
      sum: targetPrice,
    })
  })
})
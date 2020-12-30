import { Provider } from '.'

let provider

beforeEach(async () => {
  provider = await Provider.create({ userId: 'test', serviceIds: 'test', bankAccount: 'test', calendarIds: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = provider.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(provider.id)
    expect(view.userId).toBe(provider.userId)
    expect(view.serviceIds).toBe(provider.serviceIds)
    expect(view.bankAccount).toBe(provider.bankAccount)
    expect(view.calendarIds).toBe(provider.calendarIds)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = provider.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(provider.id)
    expect(view.userId).toBe(provider.userId)
    expect(view.serviceIds).toBe(provider.serviceIds)
    expect(view.bankAccount).toBe(provider.bankAccount)
    expect(view.calendarIds).toBe(provider.calendarIds)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

import { Service } from '.'

let service

beforeEach(async () => {
  service = await Service.create({ providerId: 'test', postcodes: 'test', title: 'test', description: 'test', category: 'test', price: 'test', pictures: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = service.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(service.id)
    expect(view.providerId).toBe(service.providerId)
    expect(view.postcodes).toBe(service.postcodes)
    expect(view.title).toBe(service.title)
    expect(view.description).toBe(service.description)
    expect(view.category).toBe(service.category)
    expect(view.price).toBe(service.price)
    expect(view.pictures).toBe(service.pictures)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = service.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(service.id)
    expect(view.providerId).toBe(service.providerId)
    expect(view.postcodes).toBe(service.postcodes)
    expect(view.title).toBe(service.title)
    expect(view.description).toBe(service.description)
    expect(view.category).toBe(service.category)
    expect(view.price).toBe(service.price)
    expect(view.pictures).toBe(service.pictures)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

import { Service } from '.'
import { User } from '../user'

let user, service

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  service = await Service.create({ userId: user, providerId: 'test', postcodes: 'test', title: 'test', description: 'test', serviceCategory: 'test', price: 'test', pictures: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = service.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(service.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.providerId).toBe(service.providerId)
    expect(view.postcodes).toBe(service.postcodes)
    expect(view.title).toBe(service.title)
    expect(view.description).toBe(service.description)
    expect(view.serviceCategory).toBe(service.serviceCategory)
    expect(view.price).toBe(service.price)
    expect(view.pictures).toBe(service.pictures)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = service.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(service.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.providerId).toBe(service.providerId)
    expect(view.postcodes).toBe(service.postcodes)
    expect(view.title).toBe(service.title)
    expect(view.description).toBe(service.description)
    expect(view.serviceCategory).toBe(service.serviceCategory)
    expect(view.price).toBe(service.price)
    expect(view.pictures).toBe(service.pictures)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

import { Provider } from '.'
import { User } from '../user'

let user, provider

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  provider = await Provider.create({ user, street: 'test', number: 'test', postcode: 'test', bankInformation: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = provider.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(provider.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.street).toBe(provider.street)
    expect(view.number).toBe(provider.number)
    expect(view.postcode).toBe(provider.postcode)
    expect(view.bankInformation).toBe(provider.bankInformation)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = provider.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(provider.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.street).toBe(provider.street)
    expect(view.number).toBe(provider.number)
    expect(view.postcode).toBe(provider.postcode)
    expect(view.bankInformation).toBe(provider.bankInformation)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

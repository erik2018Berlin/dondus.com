import { Customer } from '.'
import { User } from '../user'

let user, customer

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  customer = await Customer.create({ user, street: 'test', number: 'test', postcode: 'test', bankInformation: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = customer.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(customer.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.street).toBe(customer.street)
    expect(view.number).toBe(customer.number)
    expect(view.postcode).toBe(customer.postcode)
    expect(view.bankInformation).toBe(customer.bankInformation)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = customer.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(customer.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.street).toBe(customer.street)
    expect(view.number).toBe(customer.number)
    expect(view.postcode).toBe(customer.postcode)
    expect(view.bankInformation).toBe(customer.bankInformation)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

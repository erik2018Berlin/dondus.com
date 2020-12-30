import { Meetingslot } from '.'
import { User } from '../user'

let user, meetingslot

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  meetingslot = await Meetingslot.create({ userId: user, date: 'test', adress: 'test', bookingId: 'test', status: 'test', serviceId: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = meetingslot.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(meetingslot.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.date).toBe(meetingslot.date)
    expect(view.adress).toBe(meetingslot.adress)
    expect(view.bookingId).toBe(meetingslot.bookingId)
    expect(view.status).toBe(meetingslot.status)
    expect(view.serviceId).toBe(meetingslot.serviceId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = meetingslot.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(meetingslot.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.date).toBe(meetingslot.date)
    expect(view.adress).toBe(meetingslot.adress)
    expect(view.bookingId).toBe(meetingslot.bookingId)
    expect(view.status).toBe(meetingslot.status)
    expect(view.serviceId).toBe(meetingslot.serviceId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

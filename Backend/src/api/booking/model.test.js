import { Booking } from '.'

let booking

beforeEach(async () => {
  booking = await Booking.create({ customerId: 'test', serviceId: 'test', abo: 'test', meetingId: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = booking.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(booking.id)
    expect(view.customerId).toBe(booking.customerId)
    expect(view.serviceId).toBe(booking.serviceId)
    expect(view.abo).toBe(booking.abo)
    expect(view.meetingId).toBe(booking.meetingId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = booking.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(booking.id)
    expect(view.customerId).toBe(booking.customerId)
    expect(view.serviceId).toBe(booking.serviceId)
    expect(view.abo).toBe(booking.abo)
    expect(view.meetingId).toBe(booking.meetingId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

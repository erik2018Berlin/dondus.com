import { MeetingSlot } from '.'

let meetingSlot

beforeEach(async () => {
  meetingSlot = await MeetingSlot.create({ serviceId: 'test', date: 'test', status: 'test', bookingId: 'test', street: 'test', number: 'test', postcode: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = meetingSlot.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(meetingSlot.id)
    expect(view.serviceId).toBe(meetingSlot.serviceId)
    expect(view.date).toBe(meetingSlot.date)
    expect(view.status).toBe(meetingSlot.status)
    expect(view.bookingId).toBe(meetingSlot.bookingId)
    expect(view.street).toBe(meetingSlot.street)
    expect(view.number).toBe(meetingSlot.number)
    expect(view.postcode).toBe(meetingSlot.postcode)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = meetingSlot.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(meetingSlot.id)
    expect(view.serviceId).toBe(meetingSlot.serviceId)
    expect(view.date).toBe(meetingSlot.date)
    expect(view.status).toBe(meetingSlot.status)
    expect(view.bookingId).toBe(meetingSlot.bookingId)
    expect(view.street).toBe(meetingSlot.street)
    expect(view.number).toBe(meetingSlot.number)
    expect(view.postcode).toBe(meetingSlot.postcode)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

import { Calendar } from '.'
import { User } from '../user'

let user, calendar

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  calendar = await Calendar.create({ userId: user, name: 'test', notes: 'test', meetingSlots: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = calendar.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(calendar.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.name).toBe(calendar.name)
    expect(view.notes).toBe(calendar.notes)
    expect(view.meetingSlots).toBe(calendar.meetingSlots)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = calendar.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(calendar.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.name).toBe(calendar.name)
    expect(view.notes).toBe(calendar.notes)
    expect(view.meetingSlots).toBe(calendar.meetingSlots)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

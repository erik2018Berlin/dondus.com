import { Calendar } from '.'

let calendar

beforeEach(async () => {
  calendar = await Calendar.create({ name: 'test', notes: 'test', meeting-slotIds: 'test', userId: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = calendar.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(calendar.id)
    expect(view.name).toBe(calendar.name)
    expect(view.notes).toBe(calendar.notes)
    expect(view.meeting-slotIds).toBe(calendar.meeting-slotIds)
    expect(view.userId).toBe(calendar.userId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = calendar.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(calendar.id)
    expect(view.name).toBe(calendar.name)
    expect(view.notes).toBe(calendar.notes)
    expect(view.meeting-slotIds).toBe(calendar.meeting-slotIds)
    expect(view.userId).toBe(calendar.userId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

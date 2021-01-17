import mongoose, { Schema } from 'mongoose'

const calendarSchema = new Schema({
  name: {
    type: String
  },
  notes: {
    type: String
  },
  meetingIds: {
  type: [Schema.ObjectId],
    ref: 'MeetingSlot',
    required: true
  },
  userId: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

calendarSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      notes: this.notes,
      meetingIds: this.meetingIds,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Calendar', calendarSchema)

export const schema = model.schema
export default model

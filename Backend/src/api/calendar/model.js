import mongoose, { Schema } from 'mongoose'

const calendarSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  notes: {
    type: String
  },
  meetingSlots: {
    type: [Schema.ObjectId],
    ref: 'Meetingslot',
    required: false
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
      userId: this.userId.view(full),
      name: this.name,
      notes: this.notes,
      meetingSlots: this.meetingSlots,
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

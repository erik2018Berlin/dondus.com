import mongoose, { Schema } from 'mongoose'

const meetingslotSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date
  },
  adress: {
    type: String
  },
  bookingId: {
    type: String
  },
  status: {
    type: String
  },
  serviceId: {
    type: Schema.ObjectId,
    ref: 'Service',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

meetingslotSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      userId: this.userId.view(full),
      date: this.date,
      adress: this.adress,
      bookingId: this.bookingId,
      status: this.status,
      serviceId: this.serviceId.view(full),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Meetingslot', meetingslotSchema)

export const schema = model.schema
export default model

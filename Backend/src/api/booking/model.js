import mongoose, { Schema } from 'mongoose'

const bookingSchema = new Schema({
  customerId: {
    type: Schema.ObjectId,
    ref: 'Customer',
    required: true
  },
  serviceId: {
    type: Schema.ObjectId,
    ref: 'Service',
    required: true
  },
  abo: {
    type: Boolean,
    default: false
  },
  meetingId: {
    type: Schema.ObjectId,
    ref: 'MeetingSlot',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

bookingSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      customerId: this.customerId,
      serviceId: this.serviceId,
      abo: this.abo,
      meetingId: this.meetingId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Booking', bookingSchema)

export const schema = model.schema
export default model

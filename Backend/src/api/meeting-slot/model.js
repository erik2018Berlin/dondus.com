import mongoose, { Schema } from 'mongoose'

const meetingSlotSchema = new Schema({
  serviceId: {
    type: Schema.ObjectId,
    ref: 'Service',
    required: true
  },
  date: {
    type: Date
  },
  status: {
    type: String
  },
  /*bookingId: {
    type: Schema.ObjectId,
    ref: 'Booking',
    required: false
  },*/
  street: {
    type: String
  },
  number: {
    type: String
  },
  postcode: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

meetingSlotSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      serviceId: this.serviceId.view(full),
      date: this.date,
      status: this.status,
    //  bookingId: this.bookingId.view(full),
      street: this.street,
      number: this.number,
      postcode: this.postcode,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('MeetingSlot', meetingSlotSchema)

export const schema = model.schema
export default model

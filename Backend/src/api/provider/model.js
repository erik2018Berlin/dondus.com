import mongoose, { Schema } from 'mongoose'

const providerSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  serviceIds: {
    type: [Schema.ObjectId],
    ref: 'Service',
    required: false
  },
  bankAccount: {
    type: String,
    required:false
  },
  calendarIds: {
    type: [Schema.ObjectId],
    ref: 'Calendar',
    required: false
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

providerSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      userId: this.userId.view(full),
      serviceIds: this.serviceIds.view(full),
      bankAccount: this.bankAccount,
      calendarIds: this.calendarIds.view(full),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Provider', providerSchema)

export const schema = model.schema
export default model

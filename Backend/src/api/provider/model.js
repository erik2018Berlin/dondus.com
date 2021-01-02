import mongoose, { Schema } from 'mongoose'

const providerSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  street: {
    type: String
  },
  number: {
    type: String
  },
  postcode: {
    type: String
  },
  bankInformation: {
    type: String,
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
      user: this.user.view(full),
      street: this.street,
      number: this.number,
      postcode: this.postcode,
      bankInformation: this.bankInformation,
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

import mongoose, { Schema } from 'mongoose'

const serviceSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  providerId: {
    type: Schema.ObjectId,
    ref: 'Provider',
    required: true
  },
  postcodes: {
    type: [String]
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  serviceCategory: {
    type: [String]
  },
  price: {
    type: String
  },
  pictures: {
    type: [String]
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

serviceSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      userId: this.userId.view(full),
      providerId: this.providerId,
      postcodes: this.postcodes,
      title: this.title,
      description: this.description,
      serviceCategory: this.serviceCategory,
      price: this.price,
      pictures: this.pictures,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Service', serviceSchema)

export const schema = model.schema
export default model

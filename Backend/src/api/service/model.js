import mongoose, { Schema } from 'mongoose'

const serviceSchema = new Schema({
  providerId: {
    type: Schema.ObjectId,
    ref: 'Provider',
    required: true
  },
  postcodes: {
    type: [String],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: [String],
    required: true
  },
  price: {
    type: String,
    required: true
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
      providerId: this.providerId.view(full),
      postcodes: this.postcodes,
      title: this.title,
      description: this.description,
      category: this.category,
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

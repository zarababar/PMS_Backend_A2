import mongoose, {Schema} from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true
    },
    imageUrl: [{
        type: String,
        required: true
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

export default mongoose.model("products", productSchema);
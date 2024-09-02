import mongoose, { Schema } from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref:'products',
        required: true
    }
    ]
});

export default mongoose.model("categories", categorySchema);
import mongoose, { Schema } from "mongoose";
import { hash, compare } from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref:'products',
        required: false
    }]


});

//Password hashed before saved to db(initial creation)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const hashedPassword = await hash(this.password, 10); // Hash the password
        this.password = hashedPassword; // Store the hashed password
        next();
    } catch (error) {
        next(error); // Pass any errors to the next middleware
    }
});

// compare hashed and other password
// userSchema.methods.isValidPassword = async function (password) {
//     try {
//         return await compare(password, this.password);
//     } catch (error) {
//         throw error;
//     }
// };
userSchema.methods.isValidPassword = async function (password) {
    try {
        console.log('Stored Password (hashed):', this.password);
        console.log('Provided Password:', password);
        
        const result = await compare(password, this.password);
        console.log('Password Match:', result);

        return result;
    } catch (error) {
        console.error('Error during password comparison:', error);
        throw error;
    }
};
export default mongoose.model("users", userSchema);
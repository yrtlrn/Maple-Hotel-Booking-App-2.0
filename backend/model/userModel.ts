import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type userInfoProps = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    matchPassword: (password: string) => boolean;
};

const userSchema = new mongoose.Schema<userInfoProps>({
    firstName: {
        type: String,
        required: true,
        length: { min: 3 },
    },
    lastName: {
        type: String,
        required: true,
        length: { min: 3 },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        length: { min: 3 },
    },
    password: {
        type: String,
        required: true,
        length: { min: 6 },
    },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.method(
    "matchPassword",
    async function matchPassword(password: string) {
        const check: boolean = await bcrypt.compare(password, this.password);
        return check;
    }
);

userSchema.pre("findOneAndUpdate", async function (next) {
    const data = JSON.parse(JSON.stringify(this.getUpdate()));
    if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        this.set({ password: hashedPassword });
    }
    next();
});

const User = mongoose.model<userInfoProps>("user", userSchema);

export default User;

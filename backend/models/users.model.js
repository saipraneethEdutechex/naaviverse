const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    email: { type: String },
    name: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    postalCode: { type: String },
    profilePicture: { type: String },
    username: { type: String },
    password: { type: String },
    userType: { type: String },
    phoneNumber: { type: String },
    financialSituation: { type: String },
    school: { type: String },
    performance: { type: String },
    curriculum: { type: String },
    stream: { type: String },
    grade: { type: String },
    OTP: { type: String },
    OTPCreatedTime: { type: Date },
    OTPAttempts: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },
    OTPverified: { type: Boolean, default: false },
    blockUntil: { type: Date },
    linkedin: { type: String },
    user_level: {type: Number},
    personality: { type: String, enum: ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional'] },
    status: { type: String, enum: ['active', 'inactive','false'], default: 'false' },
}, {
    timestamps: true
});

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

module.exports = mongoose.model('naavi_users', userSchema);
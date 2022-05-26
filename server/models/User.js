const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
    },
    { timestamps: true }
);

UserSchema.methods.comparePassword = function (password, next) {
    bcrypt.compare(password, this.password, function (err, match) {
        return next(match);
    });
}

UserSchema.pre("updateOne", function (next) {
    let password = this._update['$setOnInsert']?.password;
    if (password) {
        return bcrypt.hash(password, parseInt(process.env.SALT), (err, hash) => {
            if (err) {
                return next(err);
            }
            this._update['$setOnInsert'].password = hash
            return next();
        })
    }

    return next();
})

module.exports = mongoose.model("User", UserSchema);
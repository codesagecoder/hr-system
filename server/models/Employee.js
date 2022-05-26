const mongoose = require("mongoose");
const User = require("./User");

const EmployeeSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        telNumber: { type: String, required: true },
        status: { type: Boolean, required: true },
        managingDepartments: [{ type: String }],
        departments: [{ type: String }]
    }, { timestamps: true }
);

EmployeeSchema.post('save', function (doc, next) {
    if (this.email)
        User.updateOne(
            { username: this.email },
            {
                $setOnInsert: {
                    password: process.env.DEFAULT_EMPLOYEE_PASSWORD,
                    username: this.email,
                    role: 'employee',
                    _id: doc._id
                }
            },
            { upsert: true }, (error) => {
                next(error);
            })
})

EmployeeSchema.post('findOneAndUpdate', function (doc, next) {
    const Department = require("./Department");

    if (doc) {
        if (this._update.$set?.firstName || this._update.$set?.lastName) {
            Department.findOneAndUpdate(
                { 'manager._id': doc._id },
                { $set: { 'manager.firstName': this._update.$set.firstName, 'manager.lastName': this._update.$set.lastName } },
                { new: true }, (err, doc) => { })
        }
        if (this._update.$set?.email) {
            User.findByIdAndUpdate(doc._id, { $set: { username: this._update.$set.email } }, { new: true }, (err, doc) => { })
        }
    }
    next()
})

module.exports = mongoose.model("Employee", EmployeeSchema);
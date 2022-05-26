const mongoose = require("mongoose");

const ManagerSchema = new mongoose.Schema(
    {
        _id: { type: String, unique: true },
        firstName: String,
        lastName: String
    },
    { timestamps: false }
)

const DepartmentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        manager: { required: true, type: ManagerSchema },
        status: { type: Boolean, required: true }
    },
    { timestamps: true }
);

DepartmentSchema.post('save', function (doc, next) {
    const Employee = require("./Employee.js")

    if (this?.manager?._id && this.name) {
        Employee.findOneAndUpdate({ _id: this.manager._id }, { $addToSet: { managingDepartments: this.name } }, null, (error, docs) => {
            next()
        })
    }
})

module.exports = mongoose.model("Department", DepartmentSchema);
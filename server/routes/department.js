const router = require("express").Router();
const Department = require("../models/Department");
const Employee = require("../models/Employee");
const checkToken = require("../auth/check-token")

router.get('/by-id/:id', checkToken, async (req, res) => {
    if (req.user.role === 'admin') {
        try {
            const foundDepartment = await Department.findById(req.params.id)
            const employees = await Employee.find({}, '_id firstName lastName')
            res.status(200).json({ department: foundDepartment, employees })
        } catch (error) {
            res.status(500).json({ message: 'failed', error })
        }
    }
})

router.get('/all', checkToken, async (req, res) => {
    if (req.user.role === 'admin') {
        try {
            const managers = await Department.find({}, 'name manager')
            res.status(200).json({ managers })
        } catch (error) {
            res.status(500).json({ message: 'failed', error })
        }
    }
})

router.get('/', checkToken, async (req, res) => {
    if (req.user.role === 'admin') {
        const { page: pg, per_page: pp, status } = req.query;
        const page = parseInt(pg), per_page = parseInt(pp);
        let departments;
        try {
            if (status === '') {
                departments = await Department.find({})
                    .skip(page > 0 ? ((page - 1) * per_page) : 0)
                    .limit(per_page)
            } else {
                departments = await Department.find({ status })
                    .skip(page > 0 ? ((page - 1) * per_page) : 0)
                    .limit(per_page)
            }
            res.status(200).json({ departments, count: await Department.countDocuments() })
        } catch (error) {
            res.status(500).json({ message: 'failed', error })
        }
    }
})

router.post('/', checkToken, async (req, res) => {
    if (req.user.role === 'admin') {
        try {
            const foundDep = await Department.findOne({ name: req.body.name });

            if (foundDep) return res.status(400).json({ message: 'Department already exists' })

            await Department.create(req.body)
            res.status(200).json({ message: 'success' })
        } catch (error) {
            return res.status(500).json({ message: 'failed', error })
        }
    }
})


router.put('/', checkToken, (req, res) => {
    if (req.user.role === 'admin') {
        Department.findByIdAndUpdate(req.query.departmentId,
            { $set: req.body }, null, async (error, doc) => {
                if (error) return res.status(400).json(error)
                try {
                    if (req.body?.name) {
                        await Employee.updateMany(
                            { managingDepartments: doc.name },
                            { $set: { 'managingDepartments.$': req.body.name } }, null,
                            (error, doc) => { })
                        await Employee.updateMany(
                            { departments: doc.name },
                            { $set: { 'departments.$': req.body.name } }, null,
                            (error, doc) => { })
                    }

                    if (req.body?.manager) {
                        await Employee.findByIdAndUpdate(doc.manager._id, { $pull: { managingDepartments: req.body.name || doc.name } })

                        await Employee.findByIdAndUpdate(req.body.manager._id, { $addToSet: { managingDepartments: req.body.name || doc.name } })
                    }
                    res.status(200).json({ message: 'succes' })
                } catch (error) {
                    res.status(500).json({ message: 'employee details failed to update', error })
                }
            }
        )
    }
})

module.exports = router;

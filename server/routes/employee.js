const router = require("express").Router();
const Employee = require("../models/Employee");
const checkToken = require("../auth/check-token")

router.get('/by-id/:id', checkToken, async (req, res) => {
    try {
        const foundEmployee = await Employee.findById(req.user.role === 'admin' ? req.params.id : req.user._id)
        res.status(200).json({ employee: foundEmployee })
    } catch (error) {
        res.status(500).json({ message: 'failed', error })
    }
})

router.get('/all', checkToken, async (req, res) => {
    try {
        const employees = await Employee.find({}, '_id firstName lastName')
        res.status(200).json({ employees })
    } catch (error) {
        res.status(500).json({ message: 'failed', error })
    }
})

router.get('/', checkToken, async (req, res) => {
    let employees = [];

    const { department_name, page: pg, per_page: pp, status } = req.query;
    const page = parseInt(pg), per_page = parseInt(pp);

    try {
        if (req.user.role === 'admin') {
            const managers = await Employee.find({ 'managingDepartments.0': { $exists: true } })

            if (department_name) {
                if (status == '') {
                    employees = await Employee.find({ $or: [{ departments: department_name }, { managingDepartments: department_name }] })
                        .skip(page > 0 ? ((page - 1) * per_page) : 0)
                        .limit(per_page)
                } else {
                    employees = await Employee.find({ status, $or: [{ departments: department_name }, { managingDepartments: department_name }] })
                        .skip(page > 0 ? ((page - 1) * per_page) : 0)
                        .limit(per_page)
                }
            } else {
                if (status === '') {
                    employees = await Employee.find()
                        .skip(page > 0 ? ((page - 1) * per_page) : 0)
                        .limit(per_page)
                } else {
                    employees = await Employee.find({ status })
                        .skip(page > 0 ? ((page - 1) * per_page) : 0)
                        .limit(per_page)
                }
            }
            res.status(200).json({ employees, managers, count: await Employee.countDocuments() })
        } else {

            const foundEmployee = Employee.findById(req.user._id);
            if (foundEmployee.managingDepartments.length > 0) {
                if (foundEmployee.managingDepartments.contains(department_name)) {
                    if (status == '') {
                        employees = await Employee.find({ departments: department_name })
                            .skip(page > 0 ? ((page - 1) * per_page) : 0)
                            .limit(per_page)
                    } else {
                        employees = await Employee.find({ departments: department_name, status })
                            .skip(page > 0 ? ((page - 1) * per_page) : 0)
                            .limit(per_page)
                    }
                } else {
                    if (status == '') {
                        employees = await Employee.find({ departments: { $in: foundEmployee.managingDepartments } })
                            .skip(page > 0 ? ((page - 1) * per_page) : 0)
                            .limit(per_page)
                    } else {
                        employees = await Employee.find({ departments: { $in: foundEmployee.managingDepartments }, status })
                            .skip(page > 0 ? ((page - 1) * per_page) : 0)
                            .limit(per_page)
                    }
                }
            } else {
                employees = [foundEmployee]
            }

            res.status(200).json({ employees, count: employees.length > 1 ? await Employee.countDocuments() : '' })
        }
    } catch (error) {
        res.status(500).json({ message: 'failed to retrieve employee data' })
    }

})

router.post('/', checkToken, async (req, res) => {

    if (req.user.role === 'admin') {
        try {
            const foundEmployee = await Employee.find({ email: req.body.email })
            if (foundEmployee.length > 0) return res.status(400).json({ message: 'employee already exists' })

            await Employee.create(req.body)

            res.status(200).json({ message: 'success' })

        } catch (error) {
            return res.status(500).json({ message: 'failed', error })
        }
    } else {
        return res.status(403).json({ message: 'not authorized' })
    }
})

router.put('/', checkToken, async (req, res) => {
    const { departments, managingDepartments, status, ...rest } = req.body

    try {
        const foundEmployee = await Employee.findOneAndUpdate(
            { _id: req.user.role === 'admin' ? req.query.userId : req.user._id },
            { $set: req.user.role === 'admin' ? req.body : { ...rest } })

        if (!foundEmployee) return res.status(400).json({ message: 'employee not found.', error })

        res.status(200).json({ message: 'success' })

    } catch (error) {
        return res.status(500).json({ message: 'failed', error })
    }
})

module.exports = router;
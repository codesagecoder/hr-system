const fs = require('fs')
const User = require('../models/User.js');

module.exports = () => {
    const path = __dirname + '/users.json'
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) return console.error(err)
        const usersConf = JSON.parse(data);
        usersConf.users.forEach(user => {
            User.updateOne(
                { username: user.username },
                { $setOnInsert: user },
                { upsert: true }, (error, result) => {
                    if (!result?.nModified) console.log(`${user.username} created`)
                    if (error) console.log(error)
                })
        })
        // delete file after creation
        // deleteUsers(path)
    })
}
const deleteUsers = (path) => {
    fs.unlink(path, (err) => {
        if (err) console.error(err)
    })
}
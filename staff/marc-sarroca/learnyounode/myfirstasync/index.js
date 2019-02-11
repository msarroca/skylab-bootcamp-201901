const fs = require('fs')


fs.readFile(process.argv[2], function firstAsync(err, data) {
    if (err) {
        console.log(err)
    } else {
        let result = data.toString().split('\n').length - 1
        console.log(result)
    }
})



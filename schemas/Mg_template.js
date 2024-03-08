const { z } = require('zod')

const mgSchema = z.object({
    name: z.string('Name must be a string').min(1, 'Name cannot be empty').max(25, 'Name cannot have more than 25 characters'),
    content: z.string('Exercises must be strings').max(100,'Exercises cannot havae more than 100 characters').array().nonempty()
})

module.exports = {
    mgSchema
}
const { z } = require('zod')
const routineSchema = z.object({
    user_id: z.number('Id must be a number'),
    content: z.object({
        1: z.number('Mg id must be a number').array('content must be an array of id').nonempty('content cannot be empty'),
        2: z.number('Mg id must be a number').array('content must be an array of id').nonempty('content cannot be empty'),
        3: z.number('Mg id must be a number').array('content must be an array of id').nonempty('content cannot be empty'),
        4: z.number('Mg id must be a number').array('content must be an array of id').nonempty('content cannot be empty'),
        5: z.number('Mg id must be a number').array('content must be an array of id').nonempty('content cannot be empty'),
        6: z.number('Mg id must be a number').array('content must be an array of id').nonempty('content cannot be empty'),
        7: z.number('Mg id must be a number').array('content must be an array of id').nonempty('content cannot be empty')
    })
})

module.exports = {
    routineSchema
}
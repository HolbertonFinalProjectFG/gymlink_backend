const { z } = require('zod')
const routineSchema = z.object({
    user_id: z.number(),
    content: z.object({
        1: z.number().array().nonempty(),
        2: z.number().array().nonempty(),
        3: z.number().array().nonempty(),
        4: z.number().array().nonempty(),
        5: z.number().array().nonempty(),
        6: z.number().array().nonempty(),
        7: z.number().array().nonempty()
    })
})

module.exports = {
    routineSchema
}
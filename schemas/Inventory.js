const { z } = require('zod')

const itemUpdateSchema = z.object({
    item_name: z.string().max(100),
    quantity: z.number().positive().safe()
})

module.exports = {
    itemUpdateSchema
}
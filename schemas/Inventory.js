const { z } = require('zod')

const inventorySchema = z.object({
    item_name: z.string().min(4).max(100),
    quantity: z.number().int().refine((value) => {return value >= 0},{message: "Number must be positive"})
});

const itemUpdateSchema = z.object({
    item_name: z.string().max(100),
    quantity: z.number().positive().safe()
})

module.exports = {
    itemUpdateSchema,
    inventorySchema
}
const { z } = require('zod')

const userUpdateSchema = z.object({
    email: z.optional(z.string().email('Invalid email').max(30)),
    password: z.optional(z.string('Invalid password').min(8).max(30)),
    phone_number: z.optional(z.string('Invalid password').max(50)),
    emergency_number: z.optional(z.string('Invalid password').max(50)),
    insurance_number: z.optional(z.string('Invalid password').max(50)),
})

module.exports = {
    userUpdateSchema
}
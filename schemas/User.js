const { z } = require('zod')

const userUpdateSchema = z.object({
    email: z.string().email('Invalid email').max(30),
    password: z.string('Invalid password').min(8).max(30),
    phone_number: z.string('Invalid number').max(50),
    emergency_number: z.string('Invalid number').max(50),
    insurance_number: z.string('Invalid number').max(50),
})

module.exports = {
    userUpdateSchema
}
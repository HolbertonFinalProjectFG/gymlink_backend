const { z } = require('zod')

const userSchema = z.object({
  name: z.string().max(50),
  surname: z.string().max(50),
  ci: z.string().min(8).max(10),
  email: z.string().email({
    message: "Write a correct email"
  }),
  password: z.string().min(6, "Password too short").max(30),
  phone_number: z.string().max(50),
  emergency_number: z.string().max(50),
  insurance_number: z.string().max(50),
});

const userUpdateSchema = z.object({
    email: z.string().email('Invalid email').max(30),
    password: z.string('Invalid password').min(8).max(30),
    phone_number: z.string('Invalid number').max(50),
    emergency_number: z.string('Invalid number').max(50),
    insurance_number: z.string('Invalid number').max(50),
})

module.exports = {
    userUpdateSchema,
    userSchema,
}
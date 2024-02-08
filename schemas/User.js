const { z } = require('zod')
const phoneRegex = new RegExp(
  /^([+]\d{1,3})(\d*)$/
);

const userSchema = z.object({
  name: z.string().min(1, {message: "Name cannot be empty"}).refine((value) => {return /^\D+$/.test(value);}, {message: 'Name must not contain numeric values'}),
  surname: z.string().refine((value) => {return /^\D+$/.test(value);}, {message: 'Surname must not contain numeric values'}),
  password: z.string('Invalid password').min(8).max(30),
  CI: z.string().min(1),
  email: z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
  birth_date: z.coerce.date(),
  phone_number: z.string().min(10).regex(phoneRegex, 'Must contain the phone prefix eg. +598...'),
  emergency_number: z.string().min(10).regex(phoneRegex, 'Must contain the phone prefix eg. +598...'),
  insurance: z.string().min(1)
});


const userUpdateSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
  password: z.string('Invalid password').min(8).max(30),
  phone_number: z.string().min(10).regex(phoneRegex, 'Must contain the phone prefix eg. +598...'),
  emergency_number: z.string().min(10).regex(phoneRegex, 'Must contain the phone prefix eg. +598...'),
  insurance: z.string().min(1),
  role_id: z.number().max(6).array().nonempty()
})

module.exports = {
    userUpdateSchema,
    userSchema,
}
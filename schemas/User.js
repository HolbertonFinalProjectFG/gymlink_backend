const { z } = require('zod')
const phoneRegex = new RegExp(
  /^([+]\d{1,3})(\d*)$/
);
const ciRegex = new RegExp(
  /^[0-9\-.]+$/
);

const userSchema = z.object({
  name: z.string().min(1, {message: "Name cannot be empty"}).refine((value) => {return /^\D+$/.test(value);}, {message: 'Name must not contain numeric values'}),
  surname: z.string().refine((value) => {return /^\D+$/.test(value);}, {message: 'Surname must not contain numeric values'}),
  // password: z.string('Invalid password').min(8).max(30),
  CI: z.string().min(1).regex(ciRegex),
  email: z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
  birth_date: z.coerce.date(),
  phone_number: z.string().min(10).max(17).regex(phoneRegex, 'Must contain the phone prefix eg. +598...'),
  emergency_number: z.string().min(10).max(17).regex(phoneRegex, 'Must contain the phone prefix eg. +598...'),
  insurance: z.string().min(1),
  role_id: z.number().max(5).array().nonempty()
});


const userUpdateSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
  password: z.string('Invalid password').min(8, 'Password must contain at least 8 characters').max(30, 'Password can\'t have more than 30 characters'),
  phone_number: z.string().min(10).regex(phoneRegex, 'Must contain the phone prefix eg. +598...'),
  emergency_number: z.string().min(10).regex(phoneRegex, 'Must contain the phone prefix eg. +598...'),
  insurance: z.string('Insurnce must be a string').min(1),
  role_id: z.number('Role id must be a number').max(5, 'There is no role with id larger than 5').array().nonempty('The role array cannot be empty'),
  trainer_id: z.number('Trainer id must be a number').nullable()
})

module.exports = {
    userUpdateSchema,
    userSchema,
}
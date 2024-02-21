const { z } = require('zod')
const routineSchema = z.object({
    1: z.number('The mg_template_id must be a number').array('You must pass an array of mg_template_id').nonempty('The array cannot be empty'),
    2: z.number('The mg_template_id must be a number').array('You must pass an array of mg_template_id').nonempty('The array cannot be empty'),
    3: z.number('The mg_template_id must be a number').array('You must pass an array of mg_template_id').nonempty('The array cannot be empty'),
    4: z.number('The mg_template_id must be a number').array('You must pass an array of mg_template_id').nonempty('The array cannot be empty'),
    5: z.number('The mg_template_id must be a number').array('You must pass an array of mg_template_id').nonempty('The array cannot be empty'),
    6: z.number('The mg_template_id must be a number').array('You must pass an array of mg_template_id').nonempty('The array cannot be empty'),
    7: z.number('The mg_template_id must be a number').array('You must pass an array of mg_template_id').nonempty('The array cannot be empty')
})

module.exports = {
    routineSchema
}
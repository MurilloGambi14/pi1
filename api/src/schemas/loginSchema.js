const z = require('zod')

const loginSchema = z.object({
  username: z.string().min(5).max(100),
  password: z.string().min(8).max(100),
})

module.exports = loginSchema
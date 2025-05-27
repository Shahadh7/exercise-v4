import * as yup from 'yup'

export const loginSchema = yup.object({
  user_id: yup.string().required('User ID is required'),
  password: yup.string().min(8).required('Password is required'),
  remember_me: yup.boolean().default(false),
})

export const registerSchema = yup.object({
  user_id: yup.string().required('User ID is required'),
  password: yup.string().min(6).required('Password is required'),
  password_confirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  remember_me: yup.boolean().default(false),
})

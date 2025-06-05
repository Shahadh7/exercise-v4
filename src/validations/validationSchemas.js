import * as yup from 'yup'

export const loginSchema = yup.object({
  user_id: yup.string().required('User ID is required'),
  password: yup.string().min(8).required('Password is required'),
  remember_me: yup.boolean().default(false),
})

export const registerSchema = yup.object({
  user_id: yup.string().required('User ID is required'),
  password: yup.string().min(8).required('Password is required'),
  password_confirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  remember_me: yup.boolean().default(false),
})

export const basicDetailsSchema = yup.object({
  salutation: yup.string().required('Salutation is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
})

const today = new Date()
const maxDate = new Date()
maxDate.setFullYear(today.getFullYear() - 17)

export const additionalDetailsSchema = yup.object({
  homeAddress: yup.string().required('Home address is required'),
  country: yup.string().required('Country is required'),
  postalCode: yup.string().required('Postal code is required'),
  dob: yup.date().nullable().notRequired().max(maxDate, 'You must be at least 17 years old'),
})

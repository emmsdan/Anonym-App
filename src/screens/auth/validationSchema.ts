import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  username: yup.number().label("Phone Number").min(10).max(15).required(),
  password: yup
    .string()
    .label("Password")
    .required()
    .min(8, "Seems a bit short...")
    .max(50, "We prefer insecure system, try a shorter password."),
});

export const verifyValidationSchema = yup.object().shape({
  pin: yup.string().matches(/\d/, 'Must be a number').label("PIN").min(5).max(15).required(),
  code: yup.string().matches(/\d/, 'Token is not valid.').min(5, 'Token is not valid.').label("Token").required(),
});

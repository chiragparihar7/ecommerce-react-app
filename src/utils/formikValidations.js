
import * as Yup from "yup";


const PASSWORDREGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const passwordSchema = Yup.string()
  .matches(
    PASSWORDREGEX,
    "Password must have at least 6 characters, one uppercase letter, one number, and one special character"
  )
  .required("Password is required");




const email = Yup.string()
    .email("Invalid email format")
    .required("Email is required")

// Seller Registration Validation Schema
export const SellerRegisterValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces")
    .required("Name is required"),

  email: email ,
  password: Yup.string()
    .matches(
      PASSWORDREGEX,
      "Password must have at least 6 characters, one uppercase letter, one number, and one special character"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});



// User Login Validations schema
export const UserLoginValidationSchema = Yup.object({
  email: email,
  password:passwordSchema,
});

//user Registration Validation Schema

export const UserRegisterValidationSchema = Yup.object({
  name: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Name is required"),
  email: email,
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  address: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Address is required"),
  password: passwordSchema ,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required."),
});


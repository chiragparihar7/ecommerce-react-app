
import * as Yup from "yup";



const PASSWORDREGEX =/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;



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

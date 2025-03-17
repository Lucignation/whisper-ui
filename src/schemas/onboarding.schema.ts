import * as yup from "yup";

// Define the validation schema
export const CompanyNameSchema = yup.object({
  name: yup
    .string()
    .required("Company/Team name is required")
    .min(3, "Company name must be at least 3 characters long")
    .max(50),
  username: yup
    .string()
    .required("Company/Team name is required")
    .min(3, "Company name must be at least 3 characters long")
    .max(50),
  invitees: yup.string(),
  // email: yup
  //   .string()
  //   .email("Invalid email address")
  //   .required("Email is required"),
  // age: yup
  //   .number()
  //   .typeError("Age must be a number")
  //   .required("Age is required")
  //   .min(18, "You must be at least 18 years old"),
  // password: yup
  //   .string()
  //   .required("Password is required")
  //   .min(6, "Password must be at least 6 characters long"),
});

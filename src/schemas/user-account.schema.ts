import * as yup from "yup";

export const userAccountSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup.number().required("Phone number is required"),
  email: yup.string().required("Email address is required"),
});

export const userAccountPasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required("Current password is required")
    .min(8, "Current password must be at least 8 characters")
    .matches(
      /[a-z]/,
      "Current password must contain at least one lowercase letter"
    )
    .matches(
      /[A-Z]/,
      "Current password must contain at least one uppercase letter"
    )
    .matches(/\d/, "Current password must contain at least one number")
    .matches(
      /[\W_]/,
      "Current password must contain at least one special character"
    )
    .test(
      "minLength",
      "Current password must be at least 8 characters long",
      function (value) {
        if (value) {
          // If the value exists, check the minimum length
          return value.length >= 8;
        }
        // If the value is undefined or empty, no validation is needed
        return true;
      }
    ),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "New password must be at least 8 characters")
    .matches(/[a-z]/, "New password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "New password must contain at least one uppercase letter")
    .matches(/\d/, "New password must contain at least one number")
    .matches(
      /[\W_]/,
      "New password must contain at least one special character"
    )
    .test(
      "minLength",
      "Password must be at least 8 characters long",
      function (value) {
        if (value) {
          // If the value exists, check the minimum length
          return value.length >= 8;
        }
        // If the value is undefined or empty, no validation is needed
        return true;
      }
    ),
  confirmPassword: yup.string().required("Retype password is required"),
});

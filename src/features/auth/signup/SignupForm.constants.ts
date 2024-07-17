import { GLOBAL_VARIABLES } from "@config/constants/globalVariables";
import { InputConfig } from "types/interfaces/InputConfig";

export const SIGNUP_FORM_CONFIG: Record<string, InputConfig> = {
  firstName: {
    name: "firstName",
    placeholder: "auth.first_name_placeholder",
    label: "auth.first_name",
    type: "text",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: "auth.first_name_required" },
  },
  lastName: {
    name: "lastName",
    placeholder: "auth.last_name_placeholder",
    label: "auth.last_name",
    type: "text",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: "auth.last_name_required" },
  },
  email: {
    name: "email",
    placeholder: "johnDoe@gmail.com",
    label: "auth.email",
    type: "email",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: {
      required: "auth.email_required",
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "auth.email_invalid",
      },
    },
  },
  password: {
    name: "password",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: "auth.password",
    placeholder: "auth.password_placeholder",
    rules: {
      required: "auth.password_required",
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        message: "auth.password_pattern",
      },
    },
  },
  passwordConfirmation: {
    name: "passwordConfirmation",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: "auth.confirm_password",
    placeholder: "auth.confirm_password_placeholder",
  },
  age: {
    name: "age",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: "auth.age",
    placeholder: "auth.age_placeholder",
    rules: { required: "auth.age_required" },
  },
  major: {
    name: "major",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: "auth.major",
    placeholder: "auth.major_placeholder",
    rules: { required: "auth.major_required" },
  },
};

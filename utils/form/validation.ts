import { emailRegex, phoneNumberRegex } from "@prettylab/core/utils/form/regex";
import dayjs from "dayjs";

export const validationRequired = {
  required: "Pole jest wymagane",
};

export const validationEmail = {
  pattern: {
    value: emailRegex,
    message: "Niepoprawny adres E-mail",
  },
};

export const validationPhoneNumber = {
  pattern: {
    value: phoneNumberRegex,
    message: "Niepoprawny numer telefonu",
  },
};

export const validationOnlyPastDate = {
  validate: (value: any) => {
    if (dayjs(value).isAfter(dayjs())) {
      return "Data nie może być z przyszłości";
    }
  },
};

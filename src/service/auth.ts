import { FormikHelpers } from "formik";

export const loginService = (callback: (err: Error, result: any) => void) => (
  payload: { username: string; password: string },
  action: FormikHelpers<any>
) => {
  // make api call
  // if success store data in async storage and return user
  // if error strip object and return only error data
  action.setSubmitting(false);
};

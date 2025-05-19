/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ReactElement } from "react";
import { PasswordInput } from "./form-components";
import { SubmitButton } from "./form-components";
import { LogInSchema } from "./login-schema";
import { sendingSignInOrSignUpRequest } from "../../../../shared/api";
import { EmailInput } from "./form-components";

interface ILoginForm {
  email: string;
  password: string;
}

const Form = (): ReactElement => {
  const { handleSubmit, control } = useForm<ILoginForm>({
    resolver: yupResolver(LogInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: ILoginForm):void => {
    const body = {
      email: data.email,
      password: data.password,
    }
    void sendingSignInOrSignUpRequest(body, "login");
  };
  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailInput
          name="email"
          control={control}
          label="Email"
          sx={{ mt: 1, mb: 2, boxSizing: "border-box" }}
        />
        <PasswordInput
          name="password"
          control={control}
          label="Password"
          sx={{ mt: 1, mb: 2, boxSizing: "border-box" }}
        />
        <SubmitButton />
      </form>
  );
};

export {Form};

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, type ReactElement } from "react";
import { sendingSignInOrSignUpRequest, useAuth } from "@/shared";
import {
  FormInputPassword,
  FormInputText,
  FormSubmitButton,
  type LoginFormType,
  LogInFormSchema,
} from "@/shared/ui";

export const LoginForm = (): ReactElement => {
  const { handleSubmit, control } = useForm<LoginFormType>({
    mode: "onChange",
    resolver: yupResolver(LogInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login } = useAuth();
  const [messageApi, setMessageApi] = useState("");

  const onSubmit = async (data: LoginFormType): Promise<void> => {
    const body = {
      email: data.email,
      password: data.password,
    };
    setMessageApi(await sendingSignInOrSignUpRequest(body, "login"));
    login();
  };
  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <FormInputText
        name="email"
        control={control}
        label="Email"
        sx={{
          mt: 1,
          mb: 2,
          boxSizing: "border-box",
        }}
      />
      <FormInputPassword
        name="password"
        control={control}
        label="Password"
        sx={{
          mt: 1,
          mb: 2,
          boxSizing: "border-box",
        }}
      />
      <div className="message-api">{messageApi}</div>
      <FormSubmitButton text={"Sign In"} />
    </form>
  );
};

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../app/services/login";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { RenderInput } from "../../components/renderInput";
import { LoginRequest, setCredentials } from "./authSlice";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, watch, control } = useForm<LoginRequest>({
    defaultValues: { email: "" },
  });
  const watchEmail = watch("email", "");

  const [login, { isLoading: isLoginLoading, isError: isLoginError }] =
    useLoginMutation();

  const onSubmit = async (formState: LoginRequest) => {
    try {
      const result = await login(formState).unwrap();
      if (result) {
        dispatch(setCredentials(result));
        toast.success("Login Success!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/4 max-w-md">
        <Card>
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          {isLoginError && (
            <Alert type="error">
              <span className="font-medium">Oops!</span> Wrong Credential.
            </Alert>
          )}

          <RenderInput
            name="email"
            label="Email address"
            validation={{
              required: "This field is required.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            }}
            control={control}
          />

          <div>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoginLoading}
              isDisabled={isLoginLoading || !watchEmail}
              fullWidth
              icon={
                <ArrowLeftOnRectangleIcon className="mr-2 h-5 w-5 text-white-500" />
              }
            >
              Sign in
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}

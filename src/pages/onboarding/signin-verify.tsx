import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import WithBackButton from "layouts/with-back-button";

import { Button } from "components/button";
import { Heading, Paragraph } from "components/typography";
import { Input } from "components/input";
import { useAuth } from "contexts/auth";
import { useEphemeralStore } from "stores/ephemeral";
import { getPostOpts } from "pages/api/utils";
import { useGlobalStore } from "stores/global";

export default function SignInVerifyPage() {
  const { login: loginAuth } = useAuth();
  const phoneNumber = useEphemeralStore((state) => state.phoneNumber);
  const phoneId = useEphemeralStore((state) => state.phoneId);
  const loginToDemoAccount = useGlobalStore(
    (state) => state.loginToDemoAccount
  );
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      passcode: "",
    },
  });

  const url = "/api/stytch/auth";

  const onSubmit = ({ passcode }: any) => {
    const options = getPostOpts({
      method_id: phoneId,
      code: passcode,
    });

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.status_code === 200) {
          // TODO: make loginToDemoAccount part of the login function
          loginToDemoAccount(data.state);
          loginAuth();
        } else {
          setError("passcode", {
            message: "Incorrect passcode",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="px-4">
      <Heading className="mb-3">Verification</Heading>
      <Paragraph className="mb-3">
        <span>A passcode is being sent to your phone </span>
        <span className="text-now-darkest">{phoneNumber}.</span>
        <span> When you have it type it in.</span>
      </Paragraph>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input id="passcode" register={register} />
        {errors.passcode && (
          <div className="mt-1 text-red-600">{errors.passcode.message}</div>
        )}
        <div className="mt-6">
          <Button disabled={watch("passcode").length < 6}>Done</Button>
        </div>
      </form>
    </div>
  );
}

SignInVerifyPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};

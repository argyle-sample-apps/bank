import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import WithBackButton from "layouts/with-back-button";

import { Button } from "components/button";
import { Heading, Paragraph } from "components/typography";
import { useProfile } from "hooks/useProfile";
import { Input } from "components/input";
import { useRouter } from "next/router";
import { CredentialsHints } from "views/credentials-hints";

const FAKE_PASSCODES = ["8081", "8082", "8083"];

export default function VerifyPage() {
  const router = useRouter();
  const { profile, isLoading } = useProfile();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      passcode: "8081",
    },
  });

  const onSubmit = (data: any) => {
    if (FAKE_PASSCODES.includes(data.passcode)) {
      router.push("/onboarding/verified");
    } else {
      setError("passcode", {
        message: "Incorrect passcode",
      });
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="px-4">
        <Heading className="mb-3">Verify your membership</Heading>
        <Paragraph className="mb-3">
          <span>A passcode is being sent to your phone </span>
          <span className="text-now-darkest">{profile.phone_number}</span>.
          <span> When you have it type it in.</span>
        </Paragraph>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input id="passcode" register={register} />
          {errors.passcode && (
            <div className="mt-1 text-red-600">{errors.passcode.message}</div>
          )}
          <div className="mt-3 mb-6">
            <span>Didn’t get the code? </span>
            <span className="text-now-purple">Resend</span>
          </div>
          <Button disabled={watch("passcode").length < 4}>Done</Button>
        </form>
      </div>
    </>
  );
}

VerifyPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};

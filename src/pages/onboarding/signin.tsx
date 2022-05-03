import { forwardRef, ReactElement, useState } from "react";
import WithBackButton from "layouts/with-back-button";
import { Button } from "components/button";
import { Heading, Paragraph } from "components/typography";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-number-input";
import { useEphemeralStore } from "stores/ephemeral";
import { getPostOpts } from "pages/api/utils";

export const CustomPhoneInput = forwardRef((props: any, ref: any) => {
  return <input ref={ref} type="tel" autoComplete="tel" {...props} />;
});
CustomPhoneInput.displayName = "CustomPhoneInput";

export default function SignInPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const phoneNumber = useEphemeralStore((state) => state.phoneNumber);
  const setPhoneNumber = useEphemeralStore((state) => state.setPhoneNumber);
  const setPhoneId = useEphemeralStore((state) => state.setPhoneId);

  const url = "/api/stytch/signin";

  const onSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const options = getPostOpts({
      phone_number: phoneNumber,
    });

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.status_code === 200) {
          setIsSubmitting(false);
          setPhoneId(data.phone_id);

          router.push("/onboarding/signin-verify");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="px-4">
      <Heading className="mb-3">Sign in</Heading>
      <Paragraph className="mb-3">
        <span>
          If you already have an account with Now, type in your phone number to
          proceed.
        </span>
      </Paragraph>
      <form onSubmit={onSubmit}>
        <PhoneInput
          international
          defaultCountry="US"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={setPhoneNumber}
          inputComponent={CustomPhoneInput}
        />
        <div className="mt-10">
          <Button disabled={isSubmitting}>Next</Button>
        </div>
      </form>
    </div>
  );
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return <WithBackButton>{page}</WithBackButton>;
};

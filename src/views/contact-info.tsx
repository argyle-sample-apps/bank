import { Heading } from "components/typography";
import { DataPoint } from "components/data-point";
import { useProfile } from "hooks/useProfile";

export function ContactInfo() {
  const { profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="grid animate-pulse gap-10">
        {[1, 2].map((el) => (
          <div key={el}>
            <div className="mb-2 h-3 w-20 rounded-full bg-gray-200"></div>
            <div className="h-4 w-32 rounded-full bg-gray-200"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <Heading className="mb-6">Contact information</Heading>
      <DataPoint label="Phone number" value={profile.phone_number} />
      <DataPoint label="Email address" value={profile.email} />
    </>
  );
}

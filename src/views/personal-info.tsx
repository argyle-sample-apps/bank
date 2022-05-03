import { Heading } from "components/typography";
import { DataPoint } from "components/data-point";
import { useProfile } from "hooks/useProfile";
import { formatAddress } from "utils";

export function PersonalInfo() {
  const { profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="grid animate-pulse gap-10">
        {[1, 2, 3, 4, 5].map((el) => (
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
      <Heading className="mb-6">Personal information</Heading>
      <DataPoint label="First name" value={profile.first_name} />
      <DataPoint label="Last name" value={profile.last_name} />
      <DataPoint label="Date of birth" value={profile.birth_date} />
      <DataPoint label="Address" value={formatAddress(profile.address)} />
      <DataPoint label="Social Security number" value={profile.ssn} />
    </>
  );
}

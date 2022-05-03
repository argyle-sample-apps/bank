import { Heading, Paragraph, Subheading } from "components/typography";
import { DataPoint } from "components/data-point";
import { usePayAllocations } from "hooks/usePayAllocations";
import currency from "currency.js";
import { formatSnakeCase } from "utils";

export function DepositInfo() {
  const { payAllocations, isLoading } = usePayAllocations();

  if (isLoading) {
    return (
      <div className="grid animate-pulse gap-10">
        {[1, 2, 3].map((el) => (
          <div key={el}>
            <div className="mb-2 h-3 w-20 rounded-full bg-gray-200"></div>
            <div className="h-4 w-32 rounded-full bg-gray-200"></div>
          </div>
        ))}
      </div>
    );
  }

  function renderAllocationValue({ allocation_type, allocation_value }: any) {
    if (allocation_value === "remainder") {
      return "Remainder";
    }
    if (allocation_type === "percent") {
      return allocation_value + "%";
    } else {
      return currency(allocation_value).format();
    }
  }

  return (
    <>
      <Heading className="mb-3">Deposit information</Heading>
      {Object.entries(payAllocations).map(([key, allocations]: any) => {
        return (
          <div key={key} className="mb-6">
            <div className="flex items-center">
              <img
                className="mr-2 h-6 w-6 rounded-full"
                src={`https://res.cloudinary.com/argyle-media/image/upload/v1600705681/partner-logos/${key}.png`}
                alt={key}
              />
              <Subheading>{formatSnakeCase(key)}</Subheading>
            </div>
            {allocations.map((allocation: any) => {
              return (
                <div key={allocation.id}>
                  <div className="my-4">
                    {/* TODO: Get bank name from routing number */}
                    <Paragraph>
                      <span className="text-now-darkorange">
                        {renderAllocationValue(allocation)}
                      </span>
                    </Paragraph>
                  </div>
                  <div className="flex gap-x-12">
                    <DataPoint
                      label="Account number"
                      value={allocation.bank_account.account_number}
                    />
                    <DataPoint
                      label="Routing number"
                      value={allocation.bank_account.routing_number}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

type DataPointProps = {
  label: string;
  value: string;
};

export const DataPoint = ({ label, value }: DataPointProps) => {
  return (
    <div className="mb-6">
      <span className="block text-xs text-gray-400">{label}</span>
      <span className="mt-0.5 block text-base">{value}</span>
    </div>
  );
};

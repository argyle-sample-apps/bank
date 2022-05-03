import clsx from "clsx";

type SplitterProps = {
  className?: string;
};

const Splitter = ({ className }: SplitterProps) => {
  return <div className={clsx("flex h-px bg-gray-100", className)} />;
};

export default Splitter;

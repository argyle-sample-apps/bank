import clsx from "clsx";
import { InlineButton } from "components/button";
import { INCOME_FILTER_ALL } from "consts";
import { useGlobalStore } from "stores/global";
import { formatSnakeCase } from "utils";
import { AddSmallIcon } from "./icons";

type SelectedSource = {
  selectedSource: string;
  setSelectedSource: (source: string) => void;
};

type IncomeSourcePickerProps = {
  sources: any;
  onLinkOpen?: () => void;
} & SelectedSource;

type SourceButtonProps = {
  source: string;
  color?: string;
} & SelectedSource;

function SourceButton({
  source,
  color,
  selectedSource,
  setSelectedSource,
}: SourceButtonProps) {
  const label = formatSnakeCase(source);
  return (
    <InlineButton
      onClick={() => setSelectedSource(source)}
      className={clsx(
        "flex flex-none items-center rounded-full px-3 py-1 !text-sm",
        selectedSource === source
          ? "!bg-gray-100 !text-now-darkest"
          : "!text-now-grey"
      )}
    >
      {color && (
        <span
          className="mr-2 block h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      <span className="flex-none">{label}</span>
    </InlineButton>
  );
}

export function IncomeSourcePicker({
  sources,
  selectedSource,
  setSelectedSource,
  onLinkOpen,
}: IncomeSourcePickerProps) {
  const isDemoAccount = useGlobalStore((state) => state.isDemoAccount);

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      <SourceButton
        source={INCOME_FILTER_ALL}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
      />
      {sources.map((source: any) => (
        <SourceButton
          key={source.id}
          source={source.link_item}
          color={source.color}
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
        />
      ))}
      {onLinkOpen && !isDemoAccount && (
        <InlineButton
          onClick={onLinkOpen}
          className="flex items-center !text-sm !font-medium !text-now-purple"
        >
          <div className="mr-1">
            <AddSmallIcon />
          </div>
          Add
        </InlineButton>
      )}
    </div>
  );
}

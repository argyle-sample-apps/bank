import clsx from "clsx";
import Splitter from "components/splitter";
import { DecorativeIconWrapper } from "./decorative-icon-wrapper";
import { AddBigIcon, WithdrawBigIcon } from "./icons";
import { Paragraph, Strong, Subparagraph } from "./typography";

export type TableSectionProps = {
  label: string;
  rows: TableRowProps[];
};

export type TableRowProps = {
  id: string;
  label: string;
  value: string;
  isAddIcon?: boolean;
  logo?: string;
  initials?: string;
  time: string;
  index?: number;
};

export type InheritRowProps = {
  isMinimal?: boolean;
};

type IconProps = {
  useIcons?: boolean;
  isAddIcon?: boolean;
  initials?: string;
  logo?: string;
  label?: string;
  index?: number;
};

const Icon = ({
  useIcons,
  isAddIcon,
  label,
  initials,
  logo,
  index,
}: IconProps) => {
  if (label == "Your FinanceNow balance") {
    // Small hack to not need any more very specialised parameters
    // or for non-UI components to know UI details
    return (
      <div className="mr-4">
        <DecorativeIconWrapper className="brand-gradient relative h-11 w-11 rounded-full">
          <Strong className="text-center !text-now-darkest">now</Strong>
        </DecorativeIconWrapper>
      </div>
    );
  }

  if (initials) {
    const colors = ["bg-now-green", "bg-now-orange", "bg-now-purple"];
    const color = colors[(index as number) % 3];

    return (
      <div
        className={clsx(
          "mr-4 h-10 w-11 rounded-full px-2 py-2 opacity-40",
          color
        )}
      >
        <Paragraph className="text-center !text-white">{initials}</Paragraph>
      </div>
    );
  }

  return useIcons ? (
    <div className="mr-4">
      {isAddIcon ? <AddBigIcon /> : <WithdrawBigIcon />}
    </div>
  ) : (
    <img className="mr-4 h-10 w-10 rounded-full" src={logo} alt={label} />
  );
};

export const TableRow = ({
  label,
  value,
  logo,
  time,
  isAddIcon,
  initials,
  isMinimal,
  index,
}: TableRowProps & InheritRowProps) => {
  const useIcons = isAddIcon !== undefined;
  const showIcon = !isMinimal && (logo || initials || useIcons);
  return (
    <div>
      <div className="my-2 flex items-center">
        {showIcon && (
          <Icon
            useIcons={useIcons}
            isAddIcon={isAddIcon}
            initials={initials}
            logo={logo}
            label={label}
            index={index}
          />
        )}
        <div className="flex w-full justify-between">
          <div className="flex-col">
            <Paragraph>
              <Subparagraph>{label}</Subparagraph>
            </Paragraph>
            <Subparagraph className="text-black opacity-40">
              {time}
            </Subparagraph>
          </div>
          <Subparagraph>{value}</Subparagraph>
        </div>
      </div>
      <Splitter />
    </div>
  );
};

export type TableProps = {
  sections: TableSectionProps[];
} & InheritRowProps;

export const Table = ({ sections, isMinimal = false }: TableProps) => {
  return (
    <div>
      {sections.map((section) => (
        <div key={section.label} className="mt-4">
          <Paragraph>{section.label}</Paragraph>
          <Splitter className="mt-1" />
          {section.rows.map((row, i) => (
            <TableRow key={row.id} {...row} index={i} isMinimal={isMinimal} />
          ))}
        </div>
      ))}
    </div>
  );
};

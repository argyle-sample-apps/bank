import Link from "next/link";
import { Paragraph, Strong } from "./typography";

export type ListElementProps = {
  id: number;
  primary: string;
  secondary: string;
  logo: string;
  aside?: string;
  url?: string;
};

export const ListElement = ({
  primary,
  secondary,
  aside,
  logo,
  url,
}: ListElementProps) => {
  return (
    <Link href={url ? url : "#"}>
      <a
        className="flex items-center py-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="mr-4 h-8 w-8 rounded-full" src={logo} alt={primary} />
        <div className="flex flex-1 justify-between">
          <div>
            <Strong className="text-sm">{primary}</Strong>
            <Paragraph className="text-sm">{secondary}</Paragraph>
          </div>
          <Paragraph className="text-sm">{aside}</Paragraph>
        </div>
      </a>
    </Link>
  );
};

export type ListProps = {
  elements: ListElementProps[];
};

export const List = ({ elements }: ListProps) => {
  return (
    <div className="divide-y border-y">
      {elements.map((element) => (
        <ListElement key={element.id} {...element} />
      ))}
    </div>
  );
};

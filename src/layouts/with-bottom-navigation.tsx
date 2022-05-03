import Link from "next/link";
import { useRouter } from "next/router";
import { useResizeDetector } from "react-resize-detector";
import { isStandaloneMode } from "utils";
import {
  HomeIcon,
  IncomeIcon,
  AccountsIcon,
  CardIcon,
  EarlyPayIcon,
  CreditIcon,
  WorkIcon,
} from "components/icons";
import clsx from "clsx";

type BottomNavigationProps = {
  height: number;
};

type WithBottomNavigationProps = {
  children: React.ReactNode;
};

function BottomNavigation({ height }: BottomNavigationProps) {
  const router = useRouter();

  const links = [
    { id: 0, label: "Home", url: "/home", icon: <HomeIcon /> },
    { id: 1, label: "Income", url: "/income", icon: <IncomeIcon /> },
    { id: 2, label: "Accounts", url: "/accounts", icon: <AccountsIcon /> },
    { id: 3, label: "Card", url: "/card", icon: <CardIcon /> },
    { id: 4, label: "Early Pay", url: "/early", icon: <EarlyPayIcon /> },
    { id: 5, label: "Credit", url: "/credit", icon: <CreditIcon /> },
    { id: 6, label: "Work", url: "/work", icon: <WorkIcon /> },
  ];

  return (
    <div className="space-between flex w-full border-t pt-2" style={{ height }}>
      {links.map((link) => (
        <Link key={link.id} href={link.url}>
          <a
            className={clsx(
              "flex flex-1 flex-col items-center text-[10px]",
              router.asPath === link.url ? "text-now-purple" : "text-now-grey"
            )}
          >
            <span className="block h-6 w-6">{link.icon}</span>
            <span>{link.label}</span>
          </a>
        </Link>
      ))}
    </div>
  );
}

function WithBottomNavigation({ children }: WithBottomNavigationProps) {
  const { height, ref } = useResizeDetector();
  const standalone = isStandaloneMode();
  const bottomNavHeight = standalone ? 83 : 54;

  return (
    <div id="__container" className="bg-white" ref={ref}>
      <main
        className="scrollbar overflow-auto"
        style={height ? { height: height - bottomNavHeight } : {}}
      >
        {children}
      </main>
      <BottomNavigation height={bottomNavHeight} />
    </div>
  );
}

export default WithBottomNavigation;

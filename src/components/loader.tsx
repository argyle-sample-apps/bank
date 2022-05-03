import { LogotypeIcon } from "./icons";

export function Loader() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-32 animate-pulse">
        <LogotypeIcon />
      </div>
    </div>
  );
}

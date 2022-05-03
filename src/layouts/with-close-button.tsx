import { useResizeDetector } from "react-resize-detector";
import { useRouter } from "next/router";
import { CloseIcon } from "components/icons";

type WithCloseButtonProps = {
  children: React.ReactNode;
  closeRoute?: string;
};

function WithCloseButton({ closeRoute, children }: WithCloseButtonProps) {
  const { height, ref } = useResizeDetector();
  const router = useRouter();

  return (
    <div id="__container" className="bg-white" ref={ref}>
      <div className="px-3 pt-6 pb-10">
        <button
          className="block h-8 w-8 p-1 text-now-grey"
          onClick={() => (closeRoute ? router.push(closeRoute) : router.back())}
        >
          <CloseIcon />
        </button>
      </div>
      <main
        className="scrollbar overflow-auto"
        style={height ? { height: height - 96 } : {}}
      >
        {children}
      </main>
    </div>
  );
}

export default WithCloseButton;

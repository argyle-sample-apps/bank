import { useResizeDetector } from "react-resize-detector";
import { useRouter } from "next/router";
import { LeftArrowIcon } from "components/icons";

type WithBackButtonProps = {
  children: React.ReactNode;
};

function WithBackButton({ children }: WithBackButtonProps) {
  const { height, ref } = useResizeDetector();
  const router = useRouter();

  return (
    <div id="__container" className="bg-white" ref={ref}>
      <div className="px-3 pt-6 pb-10">
        <button
          className="block h-8 w-8 p-1 text-now-grey"
          onClick={() => router.back()}
        >
          <LeftArrowIcon />
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

export default WithBackButton;

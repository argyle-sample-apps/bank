import { useResizeDetector } from "react-resize-detector";

type FullscreenProps = {
  children: React.ReactNode;
};

function Fullscreen({ children }: FullscreenProps) {
  const { height, ref } = useResizeDetector();

  return (
    <div id="__container" className="bg-white" ref={ref}>
      <main
        className="scrollbar overflow-auto"
        style={height ? { height: height } : {}}
      >
        {children}
      </main>
    </div>
  );
}

export default Fullscreen;

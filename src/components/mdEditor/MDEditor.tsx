import React, { ChangeEvent, Suspense, useRef, useState } from "react";

const ReactMarkdown = React.lazy(() => import("react-markdown"));

interface Props {
  label: string;
  initialContent: string;
  onChange: (content: string) => void;
}

function MDEditor({ label, ...props }: Props) {
  const [showMD, setShowMD] = useState<boolean>(false);
  const [content, setContent] = useState(props.initialContent);

  const ref = useRef<HTMLTextAreaElement>(null);

  const onToggleMD = () => {
    setShowMD(!showMD);
    !showMD && ref.current && ref.current.focus();
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    props.onChange(e.target.value);
  };
  return (
    <>
      <div className="flex items-end justify-between my-2">
        <label className={` text-sm md:text-lg font-semibold`} htmlFor="editor">
          {label}
        </label>
        <div className="hover:cursor-pointer flex justify-end mt-4">
          <button
            id="previewToggle"
            className="shadow-slate-400 text-slate-800 active:bg-slate-50 hover:bg-slate-300 md:w-24 md:text-sm w-20 px-2 py-1 text-xs border rounded shadow"
            onClick={onToggleMD}
          >
            {showMD ? "Edit" : "Preview"}
          </button>
        </div>
      </div>
      {showMD ? (
        <div className="border-slate-300 text-slate-800 focus:outline-slate-700 focus:ring-slate-700 flex items-start justify-center w-full p-4 overflow-scroll bg-white border rounded">
          <div className="lg:prose-2xl px-4 py-2 prose h-[520px] box-border ">
            <Suspense
              fallback={
                <div className="flex items-center justify-center w-full h-full">
                  <div className="border-slate-200 animate-spin border-t-slate-500 w-8 h-8 border-8 border-t-8 rounded-full"></div>
                </div>
              }
            >
              <ReactMarkdown>
                {content === "" ? `#### Start Hacking...` : content}
              </ReactMarkdown>
            </Suspense>
          </div>
        </div>
      ) : (
        <div>
          <textarea
            placeholder="Start Hacking..."
            autoFocus
            ref={ref}
            className=" text-slate-800 border-slate-300 focus:outline-slate-500 focus:ring-slate-500 md:p-5 box-border w-full p-2 border rounded"
            name="editor"
            id="editor"
            value={content}
            rows={20}
            onChange={onChange}
          ></textarea>
        </div>
      )}

      {/* This is a hack to force react to load the ReactMarkDown component on page load
       * This way the component is downloaded when the user is typing in the text area
       * and even if the user clicks on preview before we finish loading the component
       * we have the suspense to show the loaded.
       */}
      <Suspense fallback={<div />}>
        <ReactMarkdown> </ReactMarkdown>
      </Suspense>
    </>
  );
}
export default MDEditor;

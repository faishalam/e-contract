'use client';
import LeftPanel from './contentForm/leftPanel';
import RightPanel from './contentForm/RightPanel';
import GoogleEditor from './contentForm/googleEditor';

export default function ContentForm() {
  return (
    <div className="w-full gap-6 flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/3 h-full">
        <LeftPanel />
      </div>

      <div className="w-full max-w-full">
        <GoogleEditor />
      </div>

      <div className="w-full md:w-1/3 h-full">
        <RightPanel />
      </div>
    </div>
  );
}

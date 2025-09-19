'use client';
import MyEditor from '@/components/molecules/tinyMCE';
import LeftPanel from './contentForm/leftPanel';
import RightPanel from './contentForm/RightPanel';

export default function ContentForm() {
  return (
    <>
      <div className="w-full gap-6 flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 h-full">
          <LeftPanel />
        </div>

        <div className="w-full h-screen">
          <MyEditor />
        </div>

        <div className="w-full md:w-1/3 h-full">
          <RightPanel />
        </div>
      </div>
    </>
  );
}

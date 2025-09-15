'use client';
import MyEditor from '@/components/molecules/tinyMCE';

export default function ContentForm() {
  return (
    <>
      <div className="w-full gap-6 px-6 py-4">
        <MyEditor />
      </div>
    </>
  );
}

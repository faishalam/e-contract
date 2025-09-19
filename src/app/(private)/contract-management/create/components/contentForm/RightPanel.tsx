'use client';
import React from 'react';
import { Download, Share2, SpellCheck, FileText } from 'lucide-react';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

type TComment = {
  id: number;
  user: string;
  text: string;
  time: string;
  color: string;
};

type TVersion = {
  id: string;
  label: string;
  description: string;
  time: string;
  current?: boolean;
};

const dummyComments: TComment[] = [
  {
    id: 1,
    user: 'Ahmad Rizki',
    text: 'Please review the payment terms section - need clarification on late fees.',
    time: '2h ago',
    color: 'border-l-orange-500',
  },
  {
    id: 2,
    user: 'Sari Indah',
    text: 'Insurance coverage amount looks good. Approved from legal perspective.',
    time: '1d ago',
    color: 'border-l-blue-500',
  },
  {
    id: 3,
    user: 'Budi Santoso',
    text: 'Consider adding force majeure clause in terms section.',
    time: '2d ago',
    color: 'border-l-yellow-500',
  },
];

const dummyVersions: TVersion[] = [
  {
    id: 'v2.1',
    label: 'v2.1 (Current)',
    description: 'Updated payment terms',
    time: '10 min ago',
    current: true,
  },
  { id: 'v2.0', label: 'v2.0', description: 'Added insurance clause', time: '2h ago' },
  { id: 'v1.9', label: 'v1.9', description: 'Initial draft complete', time: '1d ago' },
];

const RightPanel = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-4 text-black bg-white rounded-md shadow p-4">
          <div className="flex items-center w-full gap-2">
            <ChatBubbleIcon style={{ fontSize: '1.5rem' }} className="text-orange-500" />
            <h1 className="text-black">Comments</h1>
          </div>
          {dummyComments.map(c => (
            <div key={c.id} className={`p-2 border-l-4 ${c.color} bg-gray-50 rounded`}>
              <p className="text-sm font-semibold">{c.user}</p>
              <p className="text-xs text-gray-600 mb-1">{c.time}</p>
              <p className="text-sm">{c.text}</p>
            </div>
          ))}
          <div className="mt-auto">
            <textarea
              placeholder="Add a comment..."
              className="w-full border rounded p-2 text-sm mb-2"
            />
            <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm w-full">
              Post
            </button>
          </div>
        </div>

        <div className="w-full rounded-md shadow bg-white flex flex-col p-4">
          <div className="flex items-center w-full gap-2">
            <ChatBubbleIcon style={{ fontSize: '1.5rem' }} className="text-orange-500" />
            <h1 className="text-black">Version History</h1>
          </div>
          <div className="flex flex-col gap-2 text-sm mt-3">
            {dummyVersions.map(v => (
              <div
                key={v.id}
                className={`p-2 rounded border ${v.current ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
              >
                <p
                  className={`${v.current ? 'text-green-700 font-semibold' : 'text-gray-800 font-medium'}`}
                >
                  {v.label}
                </p>
                <p className="text-xs text-gray-600">{v.description}</p>
                <p className="text-xs text-gray-400">{v.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full rounded-md shadow bg-white flex flex-col p-4 text-black gap-2">
          <div className="flex items-center w-full gap-2">
            <ChatBubbleIcon style={{ fontSize: '1.5rem' }} className="text-orange-500" />
            <h1 className="text-black">Document Actions</h1>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-400 text-sm mt-3">
            <Download size={16} /> Export as PDF
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-400 text-sm">
            <FileText size={16} /> Export as DOCX
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-400 text-sm">
            <Share2 size={16} /> Share Document
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-400 text-sm">
            <SpellCheck size={16} /> Spell Check
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-400 text-sm">
            <SpellCheck size={16} /> Improve grammar
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-400 text-sm">
            <SpellCheck size={16} /> Check legal risks
          </button>
        </div>
      </div>
    </>
  );
};

export default RightPanel;

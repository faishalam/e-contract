'use client';
import React from 'react';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

type TComment = {
  id: number;
  user: string;
  text: string;
  time: string;
  color: string;
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
      </div>
    </>
  );
};

export default RightPanel;

import React, { useState } from 'react';
import { FaUserTie } from 'react-icons/fa';
import DeleteIcon from '@mui/icons-material/Delete';
import CAutoComplete from '@/components/atoms/auto-complete';
import { TextArea } from '@/components/atoms/Input-text-area';
import { Button } from '@mui/material';

type Reviewer = {
  id: number;
  title: string;
  reviewer: string;
  reviewType: string;
  instructions: string;
};

const reviewerOptions = [
  'Sari Indah - Legal Department',
  'Ahmad Rizki - Finance Department',
  'Budi Santoso - HR Department',
];

const reviewTypeOptions = ['Required Approval', 'Optional Review'];

export default function ContractReviewers() {
  const [reviewers, setReviewers] = useState<Reviewer[]>([
    {
      id: 1,
      title: 'Legal Review',
      reviewer: reviewerOptions[0],
      reviewType: reviewTypeOptions[0],
      instructions:
        'Please review legal compliance, terms and conditions, and ensure all clauses meet company standards.',
    },
    {
      id: 2,
      title: 'Finance Review',
      reviewer: reviewerOptions[1],
      reviewType: reviewTypeOptions[0],
      instructions: 'Please review payment terms, contract value, and ensure budget alignment.',
    },
  ]);

  const handleAddReviewer = () => {
    const newId = reviewers.length + 1;
    setReviewers([
      ...reviewers,
      {
        id: newId,
        title: `Reviewer ${newId}`,
        reviewer: '',
        reviewType: '',
        instructions: '',
      },
    ]);
  };

  const handleDeleteReviewer = (id: number) => {
    setReviewers(reviewers.filter(r => r.id !== id));
  };

  return (
    <div className="w-full bg-white rounded-md shadow p-4">
      <div className="flex justify-between items-center">
        <h2 className="flex items-center gap-2 font-semibold text-md text-gray-800">
          <FaUserTie className="text-orange-500" />
          Contract Reviewers
        </h2>
        <Button
          onClick={handleAddReviewer}
          className="!bg-orange-500 !hover:bg-orange-600 !text-white !text-sm !font-medium !px-4 !py-2 !capitalize"
        >
          + Add Reviewer
        </Button>
      </div>

      {reviewers?.map((item, idx) => (
        <div className="rounded-md border p-3 w-full mt-4" key={idx}>
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-2 w-full">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-500 text-white text-sm font-medium">
                {idx + 1}
              </span>
              <span className="font-semibold text-gray-700 text-sm">{item.title}</span>
            </div>

            <div className="w-full flex justify-end">
              <DeleteIcon
                style={{ fontSize: '1.5rem' }}
                className="text-red-600 cursor-pointer hover:text-red-800"
                onClick={() => handleDeleteReviewer(item.id)}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 text-black mt-4">
            <div className="flex w-full md:flex-row flex-col gap-2">
              <CAutoComplete
                className="w-full"
                options={reviewerOptions}
                placeholder="Select Reviewer"
              />
              <CAutoComplete
                className="w-full"
                options={reviewTypeOptions}
                placeholder="Select Reviewer Type"
              />
            </div>
            <div>
              <TextArea
                className="w-full"
                placeholder="please review payment terms, contact value, and ensure budget alignment"
                label="Review Instruction"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import CodeOffIcon from '@mui/icons-material/CodeOff';

type TVariableGroup = {
  title: string;
  variables: string[];
};

type TOutlineItem = {
  id: string;
  title: string;
  children?: TOutlineItem[];
};

const dummyGroups: TVariableGroup[] = [
  {
    title: 'PARTIES',
    variables: ['{{FIRST_PARTY_NAME}}', '{{SECOND_PARTY_NAME}}', '{{SECOND_PARTY_ADDRESS}}'],
  },
  {
    title: 'DATES',
    variables: ['{{EFFECTIVE_DATE}}', '{{EXPIRY_DATE}}', '{{CURRENT_DATE}}'],
  },
  {
    title: 'FINANCIAL',
    variables: ['{{CONTRACT_VALUE}}', '{{CURRENCY}}', '{{PAYMENT_TERMS}}'],
  },
  {
    title: 'SERVICE DETAILS',
    variables: ['{{SERVICE_DESCRIPTION}}', '{{DELIVERY_TIMEFRAME}}'],
  },
];

const dummyOutline: TOutlineItem[] = [
  { id: '1', title: '1. Introduction', children: [{ id: '1.1', title: '1.1 Purpose' }] },
  { id: '2', title: '2. Scope of Services' },
  { id: '3', title: '3. Terms & Conditions' },
  { id: '4', title: '4. Payment Terms' },
  { id: '5', title: '5. Termination' },
  { id: '6', title: '6. Signatures' },
];

const LeftPanel = () => {
  const [expanded, setExpanded] = useState<string | null>('1');

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full bg-white rounded-md shadow p-4">
          <div className="flex items-center w-full gap-2">
            <CodeOffIcon style={{ fontSize: '1.5rem' }} className="text-orange-500" />
            <h1 className="text-black">Template Variables</h1>
          </div>
          <div className="flex flex-col mt-4">
            {dummyGroups.map((group, idx) => (
              <div key={idx} className="mb-4">
                <p className="text-xs font-semibold text-gray-600">{group.title}</p>
                <div className="flex flex-col gap-1 mt-2 text-black">
                  {group.variables.map(v => (
                    <div
                      key={v}
                      className="bg-gray-100 hover:bg-gray-200 text-xs p-1 px-2 rounded cursor-pointer"
                    >
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full bg-white rounded-md shadow p-4">
          <div className="flex items-center w-full gap-2">
            <CodeOffIcon style={{ fontSize: '1.5rem' }} className="text-orange-500" />
            <h1 className="text-black">Document Outline</h1>
          </div>
          <ul className="flex flex-col gap-2 text-sm mt-4">
            {dummyOutline.map(item => (
              <li key={item.id}>
                <div
                  className={`cursor-pointer ${expanded === item.id ? 'text-orange-600' : 'text-gray-800'}`}
                  onClick={() => toggleExpand(item.id)}
                >
                  {item.title}
                </div>
                {expanded === item.id && item.children && (
                  <ul className="ml-4 mt-1 text-xs text-gray-600">
                    {item.children.map(child => (
                      <li key={child.id}>{child.title}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default LeftPanel;

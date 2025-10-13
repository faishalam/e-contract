'use client';
import React, { useState, useCallback, RefCallback } from 'react';
import { useDrag } from 'react-dnd';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import TitleIcon from '@mui/icons-material/Title';
import BusinessIcon from '@mui/icons-material/Business';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// Types
type TVariable = {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
};

type TVariableGroup = {
  title: string;
  variables: TVariable[];
};

// Drag Item Types
export const ItemTypes = {
  VARIABLE: 'variable',
  CLAUSE: 'clause',
};

// DraggableVariable Component
const DraggableVariable: React.FC<{ variable: TVariable }> = ({ variable }) => {
  const [copied, setCopied] = useState(false);

  const [{ isDragging }, dragRef] = useDrag<TVariable, void, { isDragging: boolean }>(() => ({
    type: ItemTypes.VARIABLE,
    item: () => variable,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const dragRefCallback = useCallback<RefCallback<HTMLDivElement>>(
    element => {
      dragRef(element);
    },
    [dragRef],
  );

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(variable.name);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div
      ref={dragRefCallback}
      className={`group bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 text-xs p-2 px-3 rounded cursor-move transition-all duration-200 flex items-center gap-2 select-none ${
        isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{ transform: isDragging ? 'rotate(5deg)' : 'rotate(0deg)' }}
    >
      <div className="w-full flex items-start gap-2 justify-center">
        <span className="text-base flex-shrink-0">{variable.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-xs text-gray-800 group-hover:text-blue-700">
            {variable.name}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">{variable.desc}</div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          onClick={handleCopy}
          className={`flex-shrink-0 p-1 rounded transition-all ${
            copied
              ? 'bg-green-500 text-white'
              : 'hover:bg-blue-100 text-gray-400 group-hover:text-blue-500'
          }`}
          title="Copy variable name"
        >
          {copied ? (
            <CheckIcon style={{ fontSize: '0.875rem' }} />
          ) : (
            <ContentCopyIcon style={{ fontSize: '0.875rem' }} />
          )}
        </button>

        <DragIndicatorIcon
          style={{ fontSize: '1rem' }}
          className="text-gray-400 group-hover:text-blue-500 flex-shrink-0 mt-0.5"
        />
      </div>
    </div>
  );
};

export default function LeftPanel() {
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({
    standard: true,
    custom: true,
    predefined: true,
  });

  const variableGroups: TVariableGroup[] = [
    {
      title: 'Standard Variables',
      variables: [
        {
          id: 'title',
          name: '{{JUDUL_KONTRAK}}',
          desc: 'Judul Kontrak',
          icon: <TitleIcon className="text-blue-600" style={{ fontSize: '15px' }} />,
        },
        {
          id: 'parties_1',
          name: '{{PIHAK_PERTAMA}}',
          desc: 'Pihak Pertama',
          icon: <BusinessIcon className="text-blue-600" style={{ fontSize: '15px' }} />,
        },
        {
          id: 'parties_2',
          name: '{{PIHAK_KEDUA}}',
          desc: 'Pihak Kedua',
          icon: <HandshakeIcon className="text-blue-600" style={{ fontSize: '15px' }} />,
        },
        {
          id: 'contract_value',
          name: '{{CONTRACT_VALUE}}',
          desc: 'Nilai Kontrak',
          icon: <AttachMoneyIcon className="text-blue-600" style={{ fontSize: '15px' }} />,
        },
        {
          id: 'current_date',
          name: '{{CURRENT_DATE}}',
          desc: 'Tanggal Dimulai',
          icon: <CalendarTodayIcon className="text-blue-600" style={{ fontSize: '15px' }} />,
        },
        {
          id: 'expiry_date',
          name: '{{EXPIRY_DATE}}',
          desc: 'Tanggal Selesai',
          icon: <EventIcon className="text-blue-600" style={{ fontSize: '15px' }} />,
        },
        {
          id: 'pic_internal',
          name: '{{PIC_INTERNAL}}',
          desc: 'PIC Internal',
          icon: <PersonIcon className="text-blue-600" style={{ fontSize: '15px' }} />,
        },
        {
          id: 'department',
          name: '{{DEPARTMENT}}',
          desc: 'Department',
          icon: <CorporateFareIcon className="text-blue-600" style={{ fontSize: '15px' }} />,
        },
        {
          id: 'descripsi_kontrak',
          name: '{{SERVICE_DESCRIPTION}}',
          desc: 'Deskripsi Kontrak',
          icon: <DescriptionIcon className="text-blue-600" style={{ fontSize: '15px' }} />,
        },
        {
          id: 'tag',
          name: '{{TAG}}',
          desc: 'Tag',
          icon: <LocalOfferIcon className="text-blue-600" style={{ fontSize: '15px' }} />,
        },
      ],
    },
  ];
  const toggleGroupExpand = (groupKey: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  return (
    // <div className="w-full flex flex-col gap-4">
    <div className="w-full bg-white rounded-md shadow p-4">
      <div className="flex items-center w-full gap-2">
        <CodeOffIcon style={{ fontSize: '1.5rem' }} className="text-orange-500" />
        <h1 className="text-black font-semibold">Template Variables</h1>
      </div>

      <div className="flex flex-col mt-4">
        {variableGroups.map((group, idx) => {
          const groupKey = group.title.toLowerCase().split(' ')[0];
          const isExpanded = expandedGroups[groupKey];

          return (
            <div key={idx} className="mb-4 border-b border-gray-200 last:border-0 pb-4 last:pb-0">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleGroupExpand(groupKey)}
                  className="flex-1 flex items-center justify-between text-xs font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <span>{group.title}</span>
                  <span className="text-gray-400">{isExpanded ? '▼' : '▶'}</span>
                </button>
              </div>

              {isExpanded && (
                <div className="flex flex-col gap-2 mt-3">
                  {group.variables.map((variable, i) => (
                    <DraggableVariable key={`${variable.id}-${i}`} variable={variable} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
        💡 <strong>Tip:</strong> Drag variabel ke editor atau klik icon copy untuk menyalin
      </div>
    </div>
    // </div>
  );
}

import { useState } from 'react';
import { Eye } from 'lucide-react';

interface TemplateOption {
  id: string;
  title: string;
  description: string;
}

const templates: TemplateOption[] = [
  {
    id: 'standar',
    title: 'Template Standar',
    description: 'Template kontrak standar POS Indonesia',
  },
  {
    id: 'nda',
    title: 'Template NDA',
    description: 'Template untuk Non-Disclosure Agreement',
  },
  {
    id: 'pengadaan',
    title: 'Template Pengadaan',
    description: 'Template untuk perjanjian pengadaan barang',
  },
];

export default function TemplateSelector() {
  const [selected, setSelected] = useState('standar');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {templates.map(t => (
        <div
          key={t.id}
          className={`rounded-xl bg-white border p-4 flex flex-col gap-3 transition cursor-pointer ${
            selected === t.id
              ? 'border-blue-500 ring-2 ring-blue-200'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => setSelected(t.id)}
        >
          {/* Header */}
          <div className="flex items-start gap-2">
            <input
              type="radio"
              name="template"
              checked={selected === t.id}
              onChange={() => setSelected(t.id)}
              className="mt-1 h-4 w-4 text-blue-600"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{t.title}</h3>
              <p className="text-sm text-gray-500">{t.description}</p>
            </div>
          </div>

          {/* File Preview Placeholder */}
          <div className="flex-1 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center py-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h10M7 11h10M7 15h10"
              />
            </svg>
          </div>

          {/* Preview Link */}
          <button className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
            <Eye className="h-4 w-4" />
            Preview
          </button>
        </div>
      ))}
    </div>
  );
}

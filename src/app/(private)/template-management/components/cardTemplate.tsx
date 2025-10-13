import React from 'react';
import { Eye, Edit, MoreVertical, Delete } from 'lucide-react';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import useTemplateManagementHooks from '../hooks';
import useProfileGlobal from '@/context/profileProvider/hooks';
import CardTemplateSkeleton from './cardTemplateSkeleton';
import { Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useModalWarningInfo } from '@/components/atoms/modal-warning';

export default function CardTemplate() {
  const {
    dataTemplateList,
    setMode,
    setSelectedTemplateId,
    setOpenModalTemplate,
    isLoadingDataTemplateList,
    isLoadingDeleteTemplate,
    mutateDeleteTemplate,
  } = useTemplateManagementHooks();
  const modalWarningInfo = useModalWarningInfo();
  const router = useRouter();
  const { isLoadingDataProfile } = useProfileGlobal();
  const truncateDescription = (text: string, maxWords = 50) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
  };

  if (isLoadingDataProfile || isLoadingDataTemplateList || isLoadingDeleteTemplate)
    return <CardTemplateSkeleton />;
  return (
    <>
      {dataTemplateList?.data?.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-gray-200 hover:shadow-md cursor-pointer transition-shadow duration-200 flex flex-col justify-between p-4"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 w-full">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TextSnippetIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="">
                <h3 className="text-sm font-semibold text-gray-900">{item.template_name}</h3>
                <p className="text-xs text-gray-500">{item.template_code}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-1/2 justify-end">
              <span
                className={`px-3 text-xs py-1 font-medium rounded-full ${
                  item.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}
              >
                {item.is_active ? 'Aktif' : 'Tidak Aktif'}
              </span>
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="h-16">
            <p className="text-sm text-gray-600 mb-4">{truncateDescription(item.description)}</p>
          </div>

          {/* Info tambahan (selalu di bawah deskripsi, sebelum border-t) */}
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>
              Dibuat:{' '}
              <span className="font-medium text-gray-700 text-xs">
                {item.created_at
                  ? new Date(item.created_at).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : '-'}
              </span>
            </span>
            <span className="text-xs">
              Digunakan: <span className="font-medium text-gray-700">{0}x</span>
            </span>
          </div>

          {/* Footer */}
          <div className="pt-1 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar
                alt={item.created_by_name}
                // src={item.created_by_avatar || ''}
                sx={{ width: 28, height: 28 }}
              />
              <span className="text-sm text-gray-700">{item.created_by_name}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMode('view');
                  if (item.id) setSelectedTemplateId(item.id);
                  setOpenModalTemplate(true);
                }}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                onClick={() => {
                  router.push(`/template-management/${item?.id}`);
                }}
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                onClick={() => {
                  modalWarningInfo.open({
                    title: 'Konfirmasi',
                    message: (
                      <div>
                        <p>Apakah anda yakin ingin menghapus Template ini?</p>
                      </div>
                    ),
                    onConfirm: () => {
                      if (!item?.id) return;
                      mutateDeleteTemplate(item?.id);
                    },
                  });
                }}
              >
                <Delete className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

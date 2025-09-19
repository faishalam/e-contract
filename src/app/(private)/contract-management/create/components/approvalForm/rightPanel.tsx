import React, { useState } from 'react';
import { Radio, Button } from '@mui/material';
import { Business } from '@mui/icons-material';
import CAutoComplete from '@/components/atoms/auto-complete';

export default function RightPanel() {
  const externals = [{ name: 'PT. Sinar Logistik', role: 'Penandatangan Final' }];

  const [selectedMethod, setSelectedMethod] = useState('esignature');

  const providers = ['Privy', 'DocuSign', 'Adobe Sign', 'HelloSign'];

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 rounded-md shadow bg-white text-black">
        <h3 className="font-semibold text-gray-800">Metode Tanda Tangan</h3>
        <p className="text-sm text-gray-500 mt-4">
          Pilih metode tanda tangan yang akan digunakan untuk kontrak ini.
        </p>

        <div className="flex flex-col gap-2">
          <div
            className={`w-full flex gap-2 text-sm p-3 cursor-pointer ${selectedMethod === 'esignature' ? 'bg-blue-50 rounded-md border-blue-500 border border-dotted' : ''}`}
          >
            <Radio
              checked={selectedMethod === 'esignature'}
              onChange={() => setSelectedMethod('esignature')}
              className="text-sm"
              id="esignature"
            />
            <label htmlFor="esignature" className="flex flex-col cursor-pointer w-full">
              e-Signature
              <span className="text-gray-400">
                Tanda tangan elektronik yang diakui secara hukum
              </span>
            </label>
          </div>

          <div
            className={`w-full flex gap-2 text-sm p-3 cursor-pointer ${selectedMethod === 'manual' ? 'bg-blue-50 rounded-md border-blue-500 border border-dotted' : ''}`}
          >
            <Radio
              checked={selectedMethod === 'manual'}
              onChange={() => setSelectedMethod('manual')}
              className="text-sm"
              id="manual"
            />
            <label htmlFor="manual" className="flex flex-col cursor-pointer w-full">
              Manual Upload
              <span className="text-gray-400">Cetak, tanda tangan, dan unggah kembali</span>
            </label>
          </div>
        </div>

        {selectedMethod === 'esignature' && (
          <CAutoComplete
            options={providers}
            label="Penyedia e-Signature"
            placeholder="Select penyedia e-Signature"
          />
        )}
      </div>

      {/* Pratinjau Alur */}
      <div className="bg-white rounded-md shadow p-4">
        <h3 className="font-semibold text-gray-800">Pritinjau Alur </h3>

        <div className="mt-4"></div>
      </div>

      {/* Pihak Eksternal */}
      <div className="p-4 rounded-md shadow bg-white text-black">
        <h3 className="font-semibold text-gray-800">Pihak Eksternal</h3>
        {externals.map((ext, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 border border-gray-300 bg-gray-50 rounded-md px-3 py-2 mt-4 mb-4 text-sm"
          >
            <Business className="text-gray-500" />
            <div>
              <p className="font-medium text-gray-800">{ext.name}</p>
              <p className="text-sm text-gray-500">{ext.role}</p>
            </div>
          </div>
        ))}
        <Button
          variant="outlined"
          fullWidth
          className="!border-dashed !border-blue-500 !text-blue-600 !capitalize"
        >
          + Tambah Pihak Eksternal
        </Button>
      </div>
    </div>
  );
}

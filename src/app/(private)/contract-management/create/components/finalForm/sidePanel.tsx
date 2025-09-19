import CInput from '@/components/atoms/input';

export default function SidePanel() {
  return (
    <>
      <div className="w-full rounded-md flex flex-col gap-4 p-4 shadow bg-white text-black">
        <div className="">
          <p className="text-black text-md">Status</p>

          <div className="flex justify-between mt-2 text-xs">
            <div className="flex flex-col gap-2 w-full">
              <p>Status Kontrak</p>
              <p>Tanggal Dibuat</p>
              <p>Tanggal Jatuh Tempo</p>
            </div>

            <div className="text-xs w-full flex flex-col justify-end text-end">
              <div className="px-2 py-1 rounded-md bg-blue-50 text-blue-400">
                Menunggu Tanda Tangan
              </div>
              <p>9 Agu 2023</p>
              <p>9 Agu 2025</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <p className="text-black text-md">Detail Kontrak</p>
          <div>
            <p className="text-gray-400 text-xs">Tipe Kontrak</p>
            <p className="text-black text-sm">Perjanjian Dagang</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Nilai Kontrak</p>
            <p className="text-black text-sm">Rp. 350.000.000</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">PIC Internal</p>
            <p className="text-black text-sm">Rini Kusuma</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="text-black text-md">Pihak Terkait</p>
          <div className="flex flex-col w-full rounded-md bg-gray-50 p-2">
            <p className="text-black text-sm">PT. POS Indonesia</p>
            <p className="text-gray-400 text-xs">Pihak Pertama</p>
          </div>
          <div className="flex flex-col w-full rounded-md bg-gray-50 p-2">
            <p className="text-black text-sm">PT. Mitra Sejahtera</p>
            <p className="text-gray-400 text-xs">Pihak Kedua</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="text-black text-md">Dokumen Terkait</p>
          <CInput disabled type="text" />
          <CInput disabled type="text" />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <p className="text-black text-md">ID Kontrak</p>
          <CInput disabled type="text" />
        </div>
      </div>
    </>
  );
}

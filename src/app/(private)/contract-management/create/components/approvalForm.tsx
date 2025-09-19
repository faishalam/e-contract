import ContractReviewers from './approvalForm/contractReviewers';
import ContractSignatories from './approvalForm/contractSinatories';
import RightPanel from './approvalForm/rightPanel';

export default function ApprovalForm() {
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="bg-white w-full p-4 rounded-md shadow text-black">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full">
              <p className="font-semibold">Perjanjian Kerjasama Pengadaan Barang</p>
              <p className="text-gray-500">PT. Mitra Sejahtera</p>
            </div>

            <div className="w-full flex">
              <div className="flex flex-col w-full">
                <p className="text-gray-500">Tipe Pekerjaan</p>
                <p>Perjanjian Pengadaan</p>
              </div>

              <div className="flex flex-col w-full">
                <p className="text-gray-500">Nilai Kontrak</p>
                <p>Rp. 250.000.000</p>
              </div>

              <div className="flex flex-col w-full">
                <p className="text-gray-500">Tanggal Jatuh Tempo</p>
                <p>12 Agu 2024</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex gap-4">
          <div className="w-full">
            <ContractReviewers />
            <ContractSignatories />
          </div>

          <div className="w-1/3">
            <RightPanel />
          </div>
        </div>
      </div>
    </>
  );
}

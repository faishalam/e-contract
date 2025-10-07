'use client';

import MerchantForm from './components/merchantForm';
import RightPanel from './components/rightPanel';

export default function CreateMerchantPage() {
  return (
    <>
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex gap-6">
          <div className="flex flex-col gap-6 w-full">
            <MerchantForm />
          </div>

          <div className="w-1/3">
            <RightPanel />
          </div>
        </div>
      </div>
    </>
  );
}

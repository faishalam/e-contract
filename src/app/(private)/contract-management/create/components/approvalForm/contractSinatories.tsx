import { FaSignature } from 'react-icons/fa';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CInput from '@/components/atoms/input';
import CAutoComplete from '@/components/atoms/auto-complete';
import { TextArea } from '@/components/atoms/Input-text-area';
import { Button } from '@mui/material';

export default function ContractSignatories() {
  return (
    <>
      <div className="bg-white w-full p-4 flex flex-col gap-4 rounded-md shadow">
        <div>
          <h2 className="flex items-center gap-2 font-semibold text-md text-gray-800">
            <FaSignature className="text-orange-500" />
            Contract Signatories
          </h2>
        </div>

        {/* first party */}
        <div className="rounded-md border p-3 w-full">
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-sm text-gray-800">
              <ApartmentIcon className="text-orange-500" />
              First Party - POS Indonesia
            </h2>
          </div>

          <div className="flex flex-col w-full gap-2 text-black mt-4">
            <div className="w-full flex gap-2">
              <div className="flex flex-col gap-2 w-full">
                <CInput label="Signature Name" className="w-full" />
                <CInput label="Email Adress" className="w-full" />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <CInput label="Position/title" className="w-full" />
                <CAutoComplete
                  options={[]}
                  className="w-full"
                  label="Signature Metode"
                  placeholder="Select signature method"
                />
              </div>
            </div>
            <TextArea label="Phone Number" className="w-full" placeholder="Enter phone number" />
          </div>
        </div>

        {/* second party */}
        <div className="rounded-md border p-3 w-full">
          <div>
            <h2 className="flex items-center gap-2 font-semibold text-sm text-gray-800">
              <ApartmentIcon className="text-orange-500" />
              Second Party - PT Sinar Logistik
            </h2>
          </div>

          <div className="flex flex-col w-full gap-2 text-black mt-4">
            <div className="w-full flex gap-2">
              <div className="flex flex-col gap-2 w-full">
                <CInput label="Signature Name" className="w-full" />
                <CInput label="Email Adress" className="w-full" />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <CInput label="Position/title" className="w-full" />
                <CAutoComplete
                  options={[]}
                  className="w-full"
                  label="Signature Metode"
                  placeholder="Select signature method"
                />
              </div>
            </div>
            <TextArea label="Phone Number" className="w-full" placeholder="Enter phone number" />
          </div>

          <div className="bg-blue-50 rounded-md shadow w-full p-4 mt-4">
            <div className="text-sm">
              <p className="text-blue-700 text-md">Signature Method Guidelines:</p>
              <li className="text-blue-600">
                <span className="text-blue-700 font-semibold">Digital Signature</span>:Legally
                binding, certificate-based authentication
              </li>
              <li className="text-blue-600">
                <span className="text-blue-700 font-semibold">Electronic Signature</span>:Image or
                stylus-based signature with verification
              </li>
              <li className="text-blue-600">
                <span className="text-blue-700 font-semibold">OTP/Email</span>:Additional
                verification layer for enchaned security
              </li>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Button className="!capitalize !bg-white !text-black !border !border-dotted">
            Add Additional Signature
          </Button>
        </div>
      </div>
    </>
  );
}

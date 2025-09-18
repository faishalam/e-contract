import { Box, Button, Checkbox, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseSharp';
import usePartnerManagement from '../hooks';
import CInput from '@/components/atoms/input';
import CAutoComplete from '@/components/atoms/auto-complete';
import { TextArea } from '@/components/atoms/Input-text-area';
import CInputFile from '@/components/atoms/input-file';

const ModalPartner: React.FC<{ mode?: 'view' | 'edit' }> = ({ mode = 'edit' }) => {
  console.log(mode);
  const { openModal, setOpenModal } = usePartnerManagement();
  return (
    <div>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=" w-full flex justify-center items-center px-72"
      >
        <Box className=" w-full bg-white rounded-md text-black">
          <div className="w-full flex justify-between items-center p-5">
            <p className="font-semibold text-xl ">Add a New Partner</p>
            <div className=" justify-end py-2 gap-2">
              <CloseIcon onClick={() => setOpenModal(!openModal)} className="cursor-pointer" />
            </div>
          </div>
          <div className="w-full bg-gray-100 p-5 border-b border-t border-gray-200">
            <p className="text-sm">
              Complete all require fields to add a new partner. We may reach out to request
              additional information.
              <span className="text-[#f46e31] cursor-pointer">
                Learn more about our partner policy
              </span>
            </p>
          </div>

          {/* content */}
          <div className="overflow-y-scroll max-h-[70vh] no-srollbar p-8 flex flex-col w-ful gap-10">
            {/* basic information */}
            <div className="flex flex-col w-full gap-3">
              <p className="text-md font-semibold">Basic Information</p>
              <div className="flex flex-col w-full gap-4">
                <CInput
                  label="Partner Name*"
                  type="text"
                  placeholder="Enter partner name"
                  className="w-full"
                />
                <div className="flex w-full justify-center items-center gap-4">
                  <CAutoComplete
                    className="w-full"
                    label="Partner Type*"
                    options={[]}
                    placeholder="Select partner type"
                  />
                  <CInput
                    label="Tax ID / NPWP*"
                    type="text"
                    placeholder="XX.XXX.XXX.X-XXX.XXX"
                    className="w-full"
                  />
                </div>
                <TextArea
                  label="Address*"
                  className="w-full"
                  placeholder="Enter complete address"
                />
                <div className="flex w-full justify-center items-center gap-4">
                  <CInput label="City*" type="text" placeholder="Enter city" className="w-full" />
                  <CInput
                    label="Province*"
                    type="text"
                    placeholder="Enter province"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Contact information */}
            <div className="flex flex-col w-full gap-3">
              <p className="text-md font-semibold">Contact Information</p>
              <div className="flex flex-col w-full gap-4">
                <div className="w-full flex justify-center items-center gap-4">
                  <CInput
                    label="Contact Person Name*"
                    type="text"
                    placeholder="Enter perseon name"
                    className="w-full"
                  />
                  <CInput
                    label="Position*"
                    type="text"
                    placeholder="Enter position name"
                    className="w-full"
                  />
                </div>
                <div className="w-full flex justify-center items-center gap-4">
                  <CInput label="Email*" type="text" placeholder="Enter email" className="w-full" />
                  <CInput
                    label="Phone Number*"
                    type="text"
                    placeholder="+62 xxx xxxx xxx"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Legal Information */}
            <div className="flex flex-col w-full gap-3">
              <p className="text-md font-semibold">Legal Documents</p>
              <div className="flex flex-col w-full gap-4">
                <CInputFile
                  label="Company Profile*"
                  id="company-profile"
                  maxSize={1024 * 1024 * 5}
                />
              </div>

              <div className="flex flex-col w-full">
                <div className="flex items-center gap-1 w-full">
                  <Checkbox />
                  <small>Business License (SIUP)</small>
                </div>
                <div className="flex items-center gap-1 w-full">
                  <Checkbox />
                  <small>Company Registration (TDP)</small>
                </div>
                <div className="flex items-center gap-1 w-full">
                  <Checkbox />
                  <small>Business Identification Number (NIB)</small>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-5 bg-gray-100 p-5 border-t border-gray-200">
            <Button
              onClick={() => setOpenModal(!openModal)}
              variant="outlined"
              className="!shadow-sm !bg-gray-100 !border-gray-300 !text-black !capitalize"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {}}
              variant="contained"
              className="!bg-orange-500 !capitalize !shadow-sm w-40"
            >
              Validate & Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default ModalPartner;

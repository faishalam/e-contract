'use client';
import EmailIcon from '@mui/icons-material/Email';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SendIcon from '@mui/icons-material/Send';
import CheckIcon from '@mui/icons-material/Check';
import LeftPanel from './components/leftPanel';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { LoadingButton } from '@mui/lab';
import { Button, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import Link from 'next/link';
import useLogin from '../login/hooks';

export default function ActivationPage() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(896); // 14:56 in seconds
  const { getValues } = useLogin();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="h-screen w-screen overflow-hidden flex flex-col justify-center items-center">
        <div className="w-full flex h-full">
          <div className="w-full h-full relative lg:block hidden ">
            <LeftPanel />
          </div>

          <div className="w-full h-full bg-[#f0fefa] bg-gradient-to-tl from-[#f0fefa] to-white flex flex-col gap-6 justify-center items-center text-black px-12">
            <div className="max-w-sm w-full rounded-lg shadow-xl flex flex-col gap-4 justify-center items-center bg-white p-7">
              <div className="flex justify-center items-center p-4 rounded-full bg-green-100">
                <VpnKeyIcon className="text-green-600" />
              </div>
              <div className="w-full justify-center items-center">
                <h1 className="text-2xl font-semibold text-center">Aktivasi Akun</h1>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Masukkan kode 6 digit yang telah dikirim ke email Anda
                </p>
              </div>

              <div className="bg-gray-50 w-full rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <EmailIcon className="text-gray-500" style={{ fontSize: '1.3rem' }} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-1">Kode dikirim ke:</p>
                    <p className="text-xs font-medium text-gray-800 break-all">
                      {getValues('email')}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-xs font-medium">Terkirim</span>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  Kode Aktivasi
                </label>
                <div className="flex gap-2 justify-center">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleCodeChange(index, e.target.value)}
                      onKeyDown={e => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg w-full p-3 flex items-center justify-between border border-blue-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-xs text-gray-700">Kode akan kedaluwarsa dalam:</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{formatTime(timeLeft)}</span>
              </div>

              <div className="w-full mt-2">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  className="w-full"
                  //   loading={isLoadingLogin}
                  // className="!capitalize !shadow-sm !bg-blue-800 !text-md"
                  color="secondary"
                  loadingIndicator={<CircularProgress className="text-white" size={20} />}
                  startIcon={<CheckIcon />}
                >
                  Activasi Akun
                </LoadingButton>
              </div>

              <div className="max-w-sm flex flex-col mb-4 gap-3">
                <p className="text-gray-500 text-center text-xs">Tidak menerima kode?</p>
                <Button
                  variant="contained"
                  fullWidth
                  className="!capitalize !shadow-sm !bg-white hover:!bg-gray-100 !text-sm !text-gray-500 !border !border-gray-200"
                  startIcon={<SendIcon className="text-black" style={{ fontSize: '1.2rem' }} />}
                  onClick={() => {
                    toast.error('Fitur belum tersedia');
                  }}
                >
                  Kirim Ulang Kode
                </Button>
              </div>

              <div className="border border-gray-200 w-full"></div>

              <div className="w-full flex justify-center items-center gap-3">
                <Button
                  variant="contained"
                  fullWidth
                  className="!capitalize !shadow-sm !bg-white hover:!bg-gray-100 !text-sm !text-gray-500 !border !border-gray-200"
                  startIcon={<EmailIcon />}
                  onClick={() => {
                    toast.error('Fitur belum tersedia');
                  }}
                >
                  Microsoft
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  className="!capitalize !shadow-sm !bg-white hover:!bg-gray-100 !text-sm !text-gray-500 !border !border-gray-200"
                  startIcon={<SupportAgentIcon />}
                  onClick={() => {
                    toast.error('Fitur belum tersedia');
                  }}
                >
                  SSO
                </Button>
              </div>

              <p className="text-xs mt-2">
                Sudah memiliki akses? {''}
                <Link href={'/login'} className="text-blue-500">
                  Masuk dsini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

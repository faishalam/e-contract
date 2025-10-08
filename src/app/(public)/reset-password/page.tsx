'use client';
import EmailIcon from '@mui/icons-material/Email';
import LeftPanel from './components/leftPanel';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Button } from '@mui/material';
import { Controller } from 'react-hook-form';
import CInput from '@/components/atoms/input';
import useResetPassword from './hooks';
import { useState } from 'react';
import CIconButton from '@/components/atoms/icon-button';

export default function ResetPasswordPage() {
  const { onSubmit, onInvalid, isLoadingResetPassword, watch, handleSubmit, control, errors } =
    useResetPassword();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const otpValue = watch('otp') || '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCodeChange = (index: number, value: string, fieldOnChange: any) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = otpValue.split('');
    newOtp[index] = value;
    const newOtpString = newOtp.join('');

    fieldOnChange(newOtpString);

    // Auto focus ke input berikutnya jika ada value
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fieldOnChange: any,
  ) => {
    if (e.key === 'Backspace') {
      const currentValue = otpValue[index];

      if (!currentValue && index > 0) {
        // Jika kosong, focus ke input sebelumnya
        const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
        prevInput?.focus();
      } else {
        // Hapus value di index saat ini
        const newOtp = otpValue.split('');
        newOtp[index] = '';
        fieldOnChange(newOtp.join(''));
      }
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePaste = (e: React.ClipboardEvent, fieldOnChange: any) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '');
    fieldOnChange(pastedData);

    // Focus ke input terakhir yang terisi
    const lastIndex = Math.min(pastedData.length - 1, 5);
    const lastInput = document.getElementById(`otp-${lastIndex}`) as HTMLInputElement;
    lastInput?.focus();
  };

  return (
    <>
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
              <h1 className="text-2xl font-semibold text-center">Reset Password</h1>
              <p className="text-sm text-gray-500 text-center mt-2">Buat Password Baru</p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit, onInvalid)}
              className="text-black flex flex-col gap-8"
            >
              <div className="flex flex-col gap-4">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      id="email"
                      label="Email Perusahaan*"
                      placeholder="nama@posindonesia.co.id"
                      required
                      autoComplete="off"
                      error={!!errors.email}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <EmailIcon className="text-gray-400" style={{ fontSize: '1.3rem' }} />
                          ),
                        },
                      }}
                    />
                  )}
                />
                <Controller
                  name="new_password"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      label="Password Baru*"
                      placeholder="Enter password"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      required
                      error={!!errors.new_password}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <CIconButton size="small" edge="end" onClick={toggleShowPassword}>
                              {showPassword ? (
                                <VisibilityOff className="text-gray-400" />
                              ) : (
                                <Visibility className="text-gray-400" />
                              )}
                            </CIconButton>
                          ),
                          startAdornment: (
                            <LockOutlineIcon
                              className="text-gray-400"
                              style={{ fontSize: '1.3rem' }}
                            />
                          ),
                        },
                      }}
                    />
                  )}
                />
                <Controller
                  name="confirm_password"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      label="Konfirmasi Password Baru*"
                      placeholder="Enter password"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      required
                      error={!!errors.new_password}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <CIconButton size="small" edge="end" onClick={toggleShowPassword}>
                              {showPassword ? (
                                <VisibilityOff className="text-gray-400" />
                              ) : (
                                <Visibility className="text-gray-400" />
                              )}
                            </CIconButton>
                          ),
                          startAdornment: (
                            <LockOutlineIcon
                              className="text-gray-400"
                              style={{ fontSize: '1.3rem' }}
                            />
                          ),
                        },
                      }}
                    />
                  )}
                />
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-medium">
                    Masukkan Kode OTP <span className="text-red-500">*</span>
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Controller
                      name="otp"
                      control={control}
                      render={({ field }) => (
                        <>
                          {Array.from({ length: 6 }).map((_, index) => (
                            <input
                              key={index}
                              id={`otp-${index}`}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={field.value?.[index] || ''}
                              onChange={e =>
                                handleCodeChange(index, e.target.value, field.onChange)
                              }
                              onKeyDown={e => handleKeyDown(index, e, field.onChange)}
                              onPaste={e => handlePaste(e, field.onChange)}
                              className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            />
                          ))}
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>

              <Button
                className="mt-4"
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
                loading={isLoadingResetPassword}
              >
                <div className="flex justify-center items-center gap-2">
                  <span>Simpan</span>
                </div>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

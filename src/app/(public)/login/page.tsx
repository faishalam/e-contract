'use client';
import DescriptionIcon from '@mui/icons-material/Description';
import { LoadingButton } from '@mui/lab';
import CIconButton from '@/components/atoms/icon-button';
import CInput from '@/components/atoms/input';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';
import { Controller } from 'react-hook-form';
import useLogin from './hooks';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function LoginPage() {
  const { control, handleSubmit, onSubmit, onInvalid, errors, isLoadingLogin } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(prev => !prev);

  return (
    <>
      <div className="relative">
        <div className="h-screen w-screen overflow-hidden grid lg:grid-cols-12">
          <div className="hidden lg:block col-span-12 lg:col-span-8">
            <div className="flex flex-col h-full bg-gray-300 rounded-r-3xl relative overflow-hidden p-16">
              <Image
                src="/asset/logo/logoPosindoWhite.png"
                alt="logo-pos-white.png"
                width={80}
                height={80}
                className="absolute z-10 right-10"
                priority
              />
              <Image
                alt="bg.jpg"
                src={'https://storage.googleapis.com/nde-bucket/logo/backgorund-nde-login.png'}
                className="brightness-75"
                fill
                style={{ objectFit: 'cover' }}
                priority
                unoptimized
              />
              <Image
                src="/asset/logo/bumn-white.png"
                alt="logo-bumn-white.png"
                width={200}
                height={200}
                className="absolute z-10"
                priority
              />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center text-white z-20">
                <p className="text-sm font-medium">
                  Powered By <b>PT Pos Finansial Indonesia</b>
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 flex items-center justify-center max-w-full px-10 sm:px-10 md:px-5">
            <div className="w-full max-w-md flex flex-col gap-4 items-center text-black">
              <div className="max-w-full w-full flex items-center gap-3 bg-orange-500 p-4 rounded-md mb-5">
                <div className="flex gap-4 justify-center items-center w-6 h-6 bg-[#2784c7] rounded-md">
                  <DescriptionIcon sx={{ color: 'white', fontSize: '0.8rem' }} />
                </div>
                <p className="text-white font-bold">eContract Platform</p>
              </div>
              <div className="max-w-full w-full gap-4 flex flex-col">
                <h1 className="text-2xl text-start">
                  Hai, Selamat Datang <br />
                  di <span className="font-bold text-[#F84F1B]">e-Contract Management</span>
                </h1>
                <div className="flex flex-col gap-1">
                  <p>Silakan Masuk</p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit, onInvalid)}
                className="w-full max-w-full flex flex-col gap-2 text-black"
              >
                <div>
                  <Controller
                    name="username"
                    control={control}
                    rules={{
                      required: 'Username wajib diisi',
                    }}
                    render={({ field }) => (
                      <CInput
                        id="username"
                        label="Username*"
                        placeholder="Enter username"
                        {...field}
                        required
                        autoComplete="off"
                      />
                    )}
                  />
                  {errors.username && (
                    <span className="text-red-500 italic text-xs">*{errors.username.message}</span>
                  )}
                </div>
                <div className="mb-4">
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: 'Password wajib diisi',
                    }}
                    render={({ field }) => (
                      <CInput
                        label="Password*"
                        placeholder="Enter password"
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                        required
                        slotProps={{
                          input: {
                            endAdornment: (
                              <CIconButton size="small" edge="end" onClick={toggleShowPassword}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </CIconButton>
                            ),
                          },
                        }}
                      />
                    )}
                  />
                  {errors.password && (
                    <span className="text-red-500 italic text-xs">*{errors.password.message}</span>
                  )}
                </div>

                <LoadingButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  loading={isLoadingLogin}
                  className="!capitalize !shadow-sm !bg-blue-800 !text-md"
                  loadingIndicator={<CircularProgress className="text-white" size={20} />}
                >
                  Masuk
                </LoadingButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

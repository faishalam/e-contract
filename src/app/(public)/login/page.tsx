'use client';
import LoginIcon from '@mui/icons-material/Login';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import CInput from '@/components/atoms/input';
import { Button } from '@mui/material';
import { Controller } from 'react-hook-form';
import useLogin from './hooks';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import EmailIcon from '@mui/icons-material/Email';
import Link from 'next/link';
import SecurityIcon from '@mui/icons-material/Security';
import { toast } from 'react-toastify';
import LeftPanel from './components/leftPanel';
import CIconButton from '@/components/atoms/icon-button';
import ModalActivate from './components/modalActivate';
import ModalForgot from './components/modalForgot';

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    onSubmit,
    onInvalid,
    errors,
    isLoadingLogin,
    openModalActivateEmail,
    setOpenModalAtivateEmail,
    setOpenModalForgotPassword,
    openModalForgotPassword,
  } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(prev => !prev);

  return (
    <>
      <div className="h-screen w-screen overflow-hidden flex flex-col justify-center items-center">
        <div className="w-full flex h-full">
          <div className="w-full h-full relative lg:block hidden ">
            <LeftPanel />
          </div>

          <div className="w-full h-full bg-[#f0fefa] bg-gradient-to-tl from-[#f0fefa] to-white flex flex-col gap-4 justify-center items-center text-black px-12">
            <div className="max-w-sm w-full rounded-lg shadow-xl flex flex-col gap-7 justify-center items-center bg-white p-7">
              <div className="w-full justify-center items-center">
                <h1 className="text-2xl font-semibold text-center">Masuk ke Akun Anda</h1>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Gunakan kredensial perusahaan untuk mengakses sistem
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="w-full flex flex-col">
                <div className="mb-4">
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
                </div>

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      label="Password*"
                      placeholder="Enter password"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      required
                      error={!!errors.password}
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

                <div className="w-full flex justify-between text-xs py-4">
                  <div className="flex items-center cursor-pointer gap-2">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />

                    <label htmlFor="rememberMe" className="cursor-pointer">
                      Ingat saya
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="text-blue-400 hover:text-glue-500 cursor-pointer"
                      onClick={e => {
                        e.preventDefault();
                        setOpenModalForgotPassword(true);
                      }}
                    >
                      Lupa Password?
                    </button>

                    <button
                      onClick={e => {
                        e.preventDefault();
                        setOpenModalAtivateEmail(true);
                      }}
                      className="text-green-600 hover:text-green-700 cursor-pointer"
                    >
                      Aktivasi Akun
                    </button>
                  </div>
                </div>

                <div className="w-full">
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="secondary"
                    startIcon={<LoginIcon />}
                    loading={isLoadingLogin}
                    className="!rounded-md"
                  >
                    Masuk ke Sistem
                  </Button>
                </div>
              </form>

              <div className="flex items-center w-full">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 text-xs">Atau masuk dengan</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div className="w-full flex justify-center items-center gap-3">
                <Button
                  variant="contained"
                  fullWidth
                  className="!capitalize !shadow-sm !bg-white hover:!bg-gray-100 !text-sm !text-gray-500 !border !border-gray-200 !rounded-md"
                  startIcon={<MicrosoftIcon className="text-blue-600" />}
                  onClick={() => {
                    toast.error('Fitur belum tersedia');
                  }}
                >
                  Microsoft
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  className="!capitalize !shadow-sm !bg-white hover:!bg-gray-100 !text-sm !text-gray-500 !border !border-gray-200 !rounded-md"
                  startIcon={<RecentActorsIcon className="text-green-600" />}
                  onClick={() => {
                    toast.error('Fitur belum tersedia');
                  }}
                >
                  SSO
                </Button>
              </div>

              <p className="text-xs mt-5">
                Belum memiliki akses?{' '}
                <Link
                  href={''}
                  onClick={() => toast.error('Fitur belum tersedia')}
                  className="text-blue-500"
                >
                  Hubungi Administrator
                </Link>
              </p>
            </div>

            <div className="text-xs max-w-sm w-full flex gap-2 bg-yellow-50 border-yellow-400 border rounded-lg p-4">
              <SecurityIcon style={{ fontSize: '1rem' }} className="text-yellow-700" />
              <div>
                <p className="text-yellow-800 font-medium">Keamanan Sistem</p>
                <p className="text-yellow-700 mt-1">
                  Sistem ini dilindungi oleh enkripsi tingkat enterprise. Semua aktivitas dicatat
                  untuk audit keamanan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModalActivateEmail && <ModalActivate />}
      {openModalForgotPassword && <ModalForgot />}
    </>
  );
}

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Loading } from './commons/loading';
import { localStorageKey } from '../consts/local-storage-key.const';
import { useNavigate } from 'react-router-dom';

type Props = {
  isLoading?: boolean;
  onCancel: () => void;
  onSubmit: (username: string, password: string) => void;
  onForgotPassword: () => void;
  children?: any;
};

export const LoginModal = (props: Props) => {
  const [formLogin, setFormLogin] = useState({
    username: '',
    password: ''
  });

  return (
    <>
      <div
        className="fixed z-[100] top-0 left-0 right-0 bottom-0 flex  items-center justify-center text-white"
        onClick={() => {
          props.onCancel();
        }}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="h-[400px] w-[400px] p-[24px] z-[101] flex flex-col items-center justify-between login-modal-content-backgournd rounded-[8px]">
          <div className="relative w-full flex justify-center">
            {/* <div className="text-[--text-title]">Đăng nhập</div>
            <div className="absolute right-[12px]">
              <svg className="w-[24px] h-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  fill="#6e788c"
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                />
              </svg> </div>*/}
            <img className="w-[78px] h-[78px]" src={require('../assets/image/logo1.png')} alt="" />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-[30px] justify-center items-center">
            {/* Username */}
            <div className="flex gap-[8px]">
              <img
                className="w-[24px] h-[24px] p-[2px]"
                src={require('../assets/image/logo2.png')}
                alt=""
              />
              <input
                onChange={(e) => setFormLogin({ ...formLogin, username: e.target.value })}
                className="placeholder-white text-white bg-transparent outline-none border-solid border-b-[2px] border-[#21FF00]"
                placeholder="Tài khoản"
              />
            </div>
            {/* Password */}
            <div className="flex gap-[8px]">
              <img
                className="w-[24px] h-[24px]"
                src={require('../assets/image/logo-password.png')}
                alt=""
              />
              <input
                type="password"
                onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })}
                className="bg-transparent placeholder-white outline-none border-solid border-b-[2px] border-[#21FF00]"
                placeholder="Mật khẩu"
              />
            </div>
          </div>

          {/* Button */}
          {props.isLoading ? (
            <div className="w-[180px] h-[50px] mb-[20px] flex items-center justify-center">
              <Loading color="white" />
            </div>
          ) : (
            <button
              className="w-[180px] h-[50px] bg-[#008A00] rounded-[8px] mt-[-20px]"
              onClick={() => props.onSubmit(formLogin.username, formLogin.password)}>
              ĐĂNG NHẬP
            </button>
          )}

          {/* Forgot password */}
          <div
            className="mt-[-30px] mb-[-10px] hover:text-red-200"
            onClick={() => props.onForgotPassword()}>
            Quên mật khẩu ?
          </div>
        </div>
        <div className="z-[100] absolute top-0 left-0 right-0 bottom-0 opacity-[0.3] bg-white"></div>
      </div>
    </>
  );
};

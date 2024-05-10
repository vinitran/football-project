import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { IUserInfo } from '../interfaces/entites/user-info';
import { localStorageKey } from '../consts/local-storage-key.const';

type Props = {
  onLogout: () => void;
  onCancel: () => void;
  children?: any;
};

export const UserInforModal = (props: Props) => {
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
  useEffect(() => {
    const localUserInfo = localStorage.getItem(localStorageKey.userInfo);
    if (localUserInfo) {
      setUserInfo(JSON.parse(localUserInfo));
    }
  }, []);
  return (
    <>
      {
        <div
          onClick={() => props.onCancel()}
          className="fixed z-[100] top-0 right-0 left-0 bottom-0 bg-transparent">
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute p-[24px] boxshadow-main rounded-[8px] right-[8px] top-[60px] bg-white flex flex-col gap-[16px] justify-center items-center">
            <div>{userInfo?.name}</div>
            <div className="w-full h-[1px] bg-gray-500 mx-[16px]"></div>
            {/* Content */}
            <div className="flex flex-col justify-center items-start gap-[8px]">
              <div className="flex items-center justify-start">
                <div className="mr-[24px] text-bold">Tài khoản:</div>
                <div>{userInfo?.username}</div>
              </div>
              <div className="flex items-center justify-start">
                <div className="mr-[24px] text-bold">Tên tài khoản:</div>
                <div>{userInfo?.name}</div>
              </div>
              <div className="flex items-center justify-start">
                <div className="mr-[24px] text-bold">Email:</div>
                <div>{userInfo?.email}</div>
              </div>
            </div>
            <button
              className="w-[120px] h-[50px] bg-[#008A00] rounded-[8px] text-white"
              onClick={() => props.onLogout()}>
              ĐĂNG XUẤT
            </button>
          </div>
        </div>
      }
    </>
  );
};

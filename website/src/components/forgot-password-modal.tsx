import { useState } from 'react';
import { Loading } from './commons/loading';
import { toast } from 'react-toastify';

type Props = {
  onCancel: () => void;
  onSubmit: (email: string) => void;
  children?: any;
};

export const ForgotPasswordModal = (props: Props) => {
  const [email, setEmail] = useState<string>('');

  return (
    <>
      <div
        className="fixed z-[100] top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white"
        onClick={() => {
          props.onCancel();
        }}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="h-[300px] w-fit p-[24px] z-[101] flex flex-col items-center justify-between login-modal-content-backgournd rounded-[8px]">
          {/* <div className="relative w-full flex justify-center">
            <img className="w-[78px] h-[78px]" src={require('../assets/image/logo1.png')} alt="" />
          </div> */}
          {/* Note */}
          <div className='uppercase text-bold text-[24px] '>Nhập email để đặt lại mật khẩu</div>

          {/* Content */}
          <div className="flex flex-col gap-[30px] justify-center items-center">
            {/* Email */}
            <div className="flex gap-[8px]">
              <img
                className="w-[24px] h-[24px] p-[2px]"
                src={require('../assets/image/logo-email.png')}
                alt=""
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="text-white bg-transparent outline-none border-solid border-b-[2px] border-[#21FF00]"
                placeholder="Email"
              />
            </div>
          </div>

          {/* Button */}
          <button
            className="w-[180px] h-[50px] bg-[#008A00] rounded-[8px] mt-[-20px]"
            onClick={() => {
              if (email.trim() !== '') {
                props.onSubmit(email);
              } else {
                toast.warning('Email không hợp lệ');
              }
            }}>
            GỬI
          </button>
        </div>
        <div className="z-[100] absolute top-0 left-0 right-0 bottom-0 opacity-[0.3] bg-white"></div>
      </div>
    </>
  );
};

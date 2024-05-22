import { useState } from 'react';
import { Loading } from '../../components/commons/loading';
import { _axios } from '../../configs/axiosconfiguartor';
import { apis } from '../../consts/api.const';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formResetPassword, setFormResetPassword] = useState({
    password: '',
    reEnterPassword: ''
  });

  // API
  const fetchResetPassword = () => {
    if (params?.token && params.email) {
      _axios
        .get(apis.auth.resetPassword())
        .then((res) => {
          if (res) {
            toast.success('Đổi mật khẩu thành công');
            navigate('/');
          }
        })
        .catch(() => {});
    } else {
        toast.warning('Bạn phải có thư xác nhận đổi mật khẩu của hệ thống')
        setIsLoading(false)
    }
  };
  return (
    <div className="relative flex justify-center items-start h-full">
      <div className="absolute z-[100] top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white">
        <div className="h-[400px] w-[400px] p-[24px] z-[101] flex flex-col items-center justify-between login-modal-content-backgournd rounded-[8px]">
          <p className="uppercase text-bold text-[24px]">Nhập mật khẩu mới</p>

          {/* Content */}
          <div className="flex flex-col gap-[50px] justify-center items-center">
            {/* Password */}
            <div className="flex gap-[8px]">
              <img
                className="w-[24px] h-[24px]"
                src={require('../../assets/image/logo-password.png')}
                alt=""
              />
              <input
                type="password"
                onChange={(e) =>
                  setFormResetPassword({ ...formResetPassword, password: e.target.value })
                }
                className="bg-transparent placeholder-white outline-none border-solid border-b-[2px] border-[#21FF00]"
                placeholder="Mật khẩu"
              />
            </div>
            {/* ReEnter Password */}
            <div className="flex gap-[8px]">
              <img
                className="w-[24px] h-[24px]"
                src={require('../../assets/image/logo-password.png')}
                alt=""
              />
              <input
                type="password"
                onChange={(e) =>
                  setFormResetPassword({ ...formResetPassword, reEnterPassword: e.target.value })
                }
                className="bg-transparent placeholder-white outline-none border-solid border-b-[2px] border-[#21FF00]"
                placeholder="Xác nhận mật khẩu"
              />
            </div>
          </div>

          {/* Button */}
          {isLoading ? (
            <div className="w-[180px] h-[50px] mb-[20px] flex items-center justify-center">
              <Loading color="white" />
            </div>
          ) : (
            <button
              className="w-[180px] h-[50px] bg-[#008A00] rounded-[8px] mt-[-20px]"
              onClick={() => {
                if (formResetPassword.password.trim() === '') {
                    toast.warning('Mật khẩu không được để trống')
                }
                else if (formResetPassword.reEnterPassword === formResetPassword.password) {
                  setIsLoading(true);
                  fetchResetPassword();
                } else {
                  toast.warning('Mật khẩu nhập lại không trùng khớp');
                }
              }}>
              XÁC NHẬN
            </button>
          )}
        </div>
        {/* <div className="z-[100] absolute top-0 left-0 right-0 bottom-0 opacity-[0.3] bg-white"></div> */}
      </div>
    </div>
  );
};

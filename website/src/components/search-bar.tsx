import { useState } from 'react';

type Props = {
  placeholder: string;
  onSearch: (value: string) => void;
};

export const SearchBar = (props: Props) => {
  const [searching, setSearching] = useState('');
  return (
    <div className="search-bar flex justify-center w-full h-[40px] mb-[12px]">
      <div className="flex w-[95%]">
        <div className="rounded-s-[16px] border-[1px] border-solid border-[--color-stroke] overflow-hidden w-full">
          <input
            onChange={(e) => setSearching(e.target.value)}
            className="flex-1 outline-none py-2 px-[18px] w-full"
            placeholder={props.placeholder}
          />
        </div>
        <button
          className="rounded-e-[16px] flex justify-center bg-[--color-three] w-[60px] p-[8px] cursor-pointer"
          onClick={() => {
            props.onSearch(searching);
          }}>
          <svg className="h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              fill="#ffffff"
              d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

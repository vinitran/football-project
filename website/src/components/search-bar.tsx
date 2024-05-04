\\\type Props = {};

export const SearchBar = (props: Props) => {
  return (
    <div className="search-bar flex justify-center w-full h-[30px] mb-[12px]">
      <div className="flex w-[80%] rounded-[16px] border-[1px] border-solid border-[--color-stroke] overflow-hidden p-2">
        <input
          // className=" w-full border-[2px] border-solid border-[--color-stroke] outline-none"
          className="flex-1 outline-none"
          placeholder="Tìm kiếm tin tức"
        />
        <button className="">Tìm kiếm</button>
      </div>
    </div>
  );
};

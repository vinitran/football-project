import React from 'react';
import { navBarList } from '../consts/nav-bar.const';

type Props = {
  children?: any;
};

export const NarBar = (props: Props) => {
  return (
    <>
      {navBarList.map((item) => (
        <a href={item?.url}>{item?.name}</a>
      ))}
    </>
  );
};

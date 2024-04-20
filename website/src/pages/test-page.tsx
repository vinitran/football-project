import React from 'react';
import { useAxios } from '../hooks/use-axios';

type Props = {};

export const TestPage = (props: Props) => {
  const [{ data, loading, error }, refetch] = useAxios('/users?delay=1');
  return (
    <>
      Calling axios: {loading ? 'loading' : 'loaded'}
      <button onClick={() => refetch}>refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';

import { useFetch } from 'react-hooks-fetch';

const Err = ({ error }) => (
  <span>
    Error:
    {error.message}
  </span>
);

const Loading = () => <span>Loading...</span>;

const PostRemoteData = () => {
  const opts = useMemo(() => ({
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
    }),
    readBody: body => body.text(),
  }), []);
  const { error, loading, data } = useFetch('https://jsonplaceholder.typicode.com/posts', opts);
  if (error) return <Err error={error} />;
  if (loading) return <Loading />;
  return (
    <span>
      Result:
      {data}
    </span>
  );
};

const App = () => (
  <PostRemoteData />
);

ReactDOM.render(<App />, document.getElementById('app'));
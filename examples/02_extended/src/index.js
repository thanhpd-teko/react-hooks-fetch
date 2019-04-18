import React, {
  Suspense,
  unstable_ConcurrentMode as ConcurrentMode,
} from 'react';
import ReactDOM from 'react-dom';
import { useMemoOne as useMemo } from 'use-memo-one';

import { useFetch } from 'react-hooks-fetch';

const Err = ({ error }) => <span>Error:{error.message}</span>;

const readBody = body => body.text();

const PostRemoteData = ({ userId, title, body }) => {
  const opts = useMemo(() => ({
    method: 'POST',
    body: JSON.stringify({
      userId,
      title,
      body,
    }),
    readBody,
  }), [userId, title, body]);
  const { error, data } = useFetch('https://jsonplaceholder.typicode.com/posts', opts);
  if (error) return <Err error={error} />;
  if (!data) return null;
  return <span>Result:{data}</span>;
};

const App = () => (
  <ConcurrentMode>
    <Suspense fallback={<span>Loading...</span>}>
      <PostRemoteData userId={1} title="foo" body="bar" />
    </Suspense>
  </ConcurrentMode>
);

ReactDOM.render(<App />, document.getElementById('app'));

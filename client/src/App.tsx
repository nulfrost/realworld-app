import React, { useState } from 'react';
import { Navbar } from 'src/components';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar />
      {count}
      <button onClick={() => setCount(count + 1)}>Upvote</button>
    </div>
  );
};

export default App;

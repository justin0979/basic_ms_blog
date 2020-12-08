import React, { useState, Suspense, lazy } from "react";
const Lazy = lazy(() => import("&components/Lazy"));

const App = () => {
  const [loaded, setLoaded] = useState(false);

  const lazyLoadLazy = () => {
    if (loaded) {
      return (
        <Suspense fallback="Lazy loading Lazy component">
          <Lazy />
        </Suspense>
      );
    }
    return <h1 data-test="lazyLoadLazyDefault">Loaded here</h1>;
  };

  return (
    <div className="app" data-test="appComponent">
      <h1>Basic React App Component</h1>
      {lazyLoadLazy()}
      <button
        className="btn"
        onClick={() => setLoaded(!loaded)}
        data-test="lazyLoadButton"
      >
        lazy load
      </button>
    </div>
  );
};

export default App;

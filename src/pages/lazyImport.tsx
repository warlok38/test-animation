import { lazy } from "react";

export const lazyImport = (componentName: string) => {
  const LazyComponent = lazy(() => import(`@/pages/${componentName}/index.ts`));

  return <LazyComponent />;
};

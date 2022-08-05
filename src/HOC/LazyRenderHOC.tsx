import React, { Suspense } from 'react';
import { Preloader } from '../components/common/Preloader/Preloader';

export function lazyRenderHOC<Type>(Component: React.ComponentType<Type>) {
  return (props: any) =>
    <Suspense fallback={<Preloader />}>
      <Component {...props} />
    </Suspense>;
}





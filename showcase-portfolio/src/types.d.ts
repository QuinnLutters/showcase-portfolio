declare module './components/Silk' {
  import * as React from 'react';
  const Silk: React.ComponentType<any>;
  export default Silk;
}

// Fallback for any other .jsx imports
declare module '*.jsx' {
  import * as React from 'react';
  const x: React.ComponentType<any>;
  export default x;
}

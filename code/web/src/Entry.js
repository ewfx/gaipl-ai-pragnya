import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Entry.css';
import Tools from './ToolList';
const Layout = () => {
return (
<div className="container-fluid h-100" style={{ minHeight: '100vh' }}>
  <div className="row h-100">
    {/* Content Section (90%) */}
    <div className="col overflow-auto border" style={{ minHeight: '100vh' }}>
      <h2 className="fw-bold">Content Section</h2>
    </div>

    <div className="overflow-auto border tools" 
         style={{ width: '100px', minHeight: '100vh' }}>
        <Tools />
    </div>
  </div>
</div> )

};

export default Layout;

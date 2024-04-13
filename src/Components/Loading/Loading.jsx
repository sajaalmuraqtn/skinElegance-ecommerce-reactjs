import React from 'react';
import './loading.css'
export default function Loading({margin,height,fontSize}) {
  return (
    <div style={{marginTop:`-${margin}px`, display:'flex',alignItems:'center',justifyContent:'center', height:`${height}px`}}>
      <span className="loader"  style={{fontSize:`${fontSize}px` }}></span>
    </div>
  );
}

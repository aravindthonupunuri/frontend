import { Redirect } from 'react-router-dom';
import React from 'react';

require("./Home.css")

export default function Home() {
  let token = sessionStorage.getItem('token');
  if (token === null) return <Redirect to="/login" />;
  else return (
    <div>
      <p>  hi  </p>
    </div>
  );
}

import {BrowserRouter as Router,  Route} from 'react-router-dom'


import React, { useEffect, useState } from "react";


import LoginNew from "./components/auth/LoginNew";
import LoginLayout from './components/LoginLayout';


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <>          
              <div className='w-full'>
                <LoginNew />
              </div>
    </>
  );
};

export default App;

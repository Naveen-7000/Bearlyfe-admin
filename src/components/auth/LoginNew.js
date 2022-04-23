
import Logo from '../../assets/icons/icon.png';
import LoginLayout from '../LoginLayout';
import { useState } from 'react';
import {loginUser} from '../../redux/actions/auth';
import { Redirect } from 'react-router-dom';

const Login = ({ auth, loginUser }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // send async request
    loginUser(user);
  };

  if (auth.access_token) {
    return <Redirect to='/' />;
  }
  

  return (
    <LoginLayout>
    <form
    onSubmit={(e) => handleSubmit(e)}
      className='form flex flex-col w-full '
      style={{
        'position':'absolute',
        'right':'20%',
        'top':'40%'
      }}
      
    >
      <span style={{
        'fontSize':'14px',
        'color':'grey',      }}>BLOGS<br/></span>
      <span className='text-3xl font-semibold mb-4' style={{
        'textAlign':'center',
      }}>
        <img src={Logo} alt='klutchh logo' style={{
          'width':'25px',
          'alignItems':'center'
        }} />
        Bearlyfe
      </span>
    
      {/* email */}
      <div style={{
        'width':'100%',
        'marginBottom':'0.5rem'
      }}>
        <label
          htmlFor='email'
          style={{
            'display':'block',
            'marginBottom':'0.5rem',
            'color':'#374151',
            'fontSize':'0.875rem',
            'fontWeight':'700'
          }}
        >
          Email
        </label>
        <input
        style={{
          'paddingTop':'0.5rem',
          'paddingBottom':'0.5rem',
          'paddingLeft':'0.75rem',
          'paddingRight':'0.75rem',
          'color':'#374151',
          'boxShadow':'0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          'borderRadius':'0.25rem',
          'borderWidth':'1px',
        }}
          id='email'
          name='email'
          type='text'
          value={user.email}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>

      {/* password */}
      <div className='form-group mb-6'>
        <label
          htmlFor='password'
          style={{
            'display':'block',
            'marginBottom':'0.5rem',
            'color':'#374151',
            'fontSize':'0.875rem',
            'fontWeight':'700'
          }}
        >
          Password
        </label>
        <input
           style={{
            'paddingTop':'0.5rem',
            'paddingBottom':'0.5rem',
            'paddingLeft':'0.75rem',
            'paddingRight':'0.75rem',
            'color':'#374151',
            'boxShadow':'0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            'borderRadius':'0.25rem',
            'borderWidth':'1px',
  
          }}
          id='password'
          name='password'
          type='password'
          value={user.password}
          onChange={(e) => handleChange(e)}
          required
        />
      </div>

      {/* <div className="forgot-password flex justify-end mb-8">
        <Link to="/reset-password" className="text-xs text-green-500">
          Forgot Password?
        </Link>
      </div> */}

      <button
        type='submit'
        style={{
          'marginTop':'10px',
          'paddingTop':'5px',
          'paddingBottom':'5px',
          'paddingLeft':'75px',
          'paddingRight':'75px',
          'backgroundColor':'#3B82F6',
          'color':'#fff',
          'borderRadius':'4px',
          'fontWeight':'700'
        }}
      >
        LOGIN
      </button>
    </form>
  </LoginLayout>
  );
};



export default Login;

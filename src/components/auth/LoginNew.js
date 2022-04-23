
import Logo from '../../assets/icons/logo_real.png';
import LoginLayout from '../LoginLayout';

const Login = () => {
  

  return (
    <LoginLayout>
    <form
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
      <span className='text-3xl font-semibold mb-4'>
        <img src={Logo} alt='klutchh logo' style={{
          'width':'80px',
          'height':'15px'
        }} />
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
          value={''}
          
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
          value={''}
          
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

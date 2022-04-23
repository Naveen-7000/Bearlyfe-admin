import BG from '../assets/icons/bg.jpeg';
import Logo from '../assets/icons/logo_real.png';

const LoginLayout = ({ children }) => {
  return (
    <>
    <div className='login w-full h-screen grid md:grid-cols-2 grid-cols-1'>
      <div className='login__left'>
        <img
          src={BG}
          alt=''
         
          style={{
            'position':'absolute',
            'height':'100vh',
            'width':'50%',
          }}
          
        />
      </div>

      <div className='box-border flex items-center w-full max-h-screen p-10 md:p-0 md:justify-center'>
        <div className='md:w-80 w-full'>{children}</div>
      </div>

      <div className='logo absolute right-10 bottom-10 md:block hidden'
       style={{
         'position':'absolute',
         'right':'10px',
         'bottom':'10px'
       }}
      >
        <img src={Logo} alt='klutchh logo' className='w-20 md:w-16' />
      </div>
    </div>
  </>
  );
};

export default LoginLayout;

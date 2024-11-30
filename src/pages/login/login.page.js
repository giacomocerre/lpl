import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../context/context';
import { doSignInWithEmailAndPassword } from '../../firebase/auth';
import ReservedArea from '../reservedPages/main.js';
import { Navbar } from '../../components/navbar/navbar.js';
import Loader from '../../components/loader/loader.js';

const LoginPage = () => {
  const { userLoggedIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignIn, setIsSignIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isSignIn) {
      setIsSignIn(true);
      try {
        setError(false);
        await doSignInWithEmailAndPassword(email, password);
        window.location.reload();
      } catch (error) {
        setError(error.message.split('Firebase:')[1]);
      } finally {
        setIsSignIn(false);
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>Login - Lega Pauper Livorno</title>
        <meta name="description" content="Accedi all'area riservata della Lega Pauper Livorno per gestire i contenuti del sito." />
        <meta name="keywords" content="login, Lega Pauper, area riservata, accesso" />
      </Helmet>
      <Navbar item={"login"} />
      <div className="p-10 md:p-20 bg-[#f6f6f6]">
        {loading ? (
          <Loader/>
        ) : !userLoggedIn ? (
          <div>
            <div className='mb-12'>
              <h1 className='font-bold text-5xl mb-5'>Lets' break the galeon!</h1>
              <p>Area riservata per l'accesso di manutazione dei contenuti del sito</p>
            </div>
            <section className="h-screen bg-gray-100">
              <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-6 space-y-4">
                <div className="mb-4">
                  <p className="text-gray-600">Entra</p>
                  <h2 className="text-xl font-bold">Accedi all'area riservata</h2>
                </div>
                <div>
                  <input
                    className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded-md text-gray-600"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded-md text-gray-600"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    onClick={handleLogin}
                    className="w-full py-4 bg-yellow-600 hover:bg-yellow-700 rounded-md text-sm font-bold text-gray-50 transition duration-200"
                  >
                    Sign In
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-row items-center">
                    <input
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="comments" className="ml-2 text-sm font-normal text-gray-600">
                      Ricordami
                    </label>
                  </div>
                  <div>
                    <span className="text-sm text-blue-600 hover:underline">
                      Password dimenticata?
                    </span>
                  </div>
                </div>
                {error && <p className='text-gray-200 bg-red-500 w-fit py-2 px-5 rounded-md'>{error}</p>}
              </div>
            </section>
          </div>
        ) : (
          <ReservedArea />
        )}
      </div>
    </div>
  );
};

export default LoginPage;

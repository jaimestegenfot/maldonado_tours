'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function AuthPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  // Login state
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  // Register state
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '', company: '' });
  const [registerError, setRegisterError] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  // Handlers para login
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    if (!loginData.email || !loginData.password) {
      setLoginError('Por favor, completa todos los campos.');
      setLoginLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error en el login');
      login(data.token, data.user);
      if (data.user.role === 'admin') router.push('/admin');
      else router.push('/dashboard');
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Error en el login');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handlers para registro
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterLoading(true);
    if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      setRegisterError('Por favor, completa todos los campos obligatorios.');
      setRegisterLoading(false);
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('Las contraseñas no coinciden');
      setRegisterLoading(false);
      return;
    }
    if (registerData.password.length < 6) {
      setRegisterError('La contraseña debe tener al menos 6 caracteres');
      setRegisterLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          company: registerData.company
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error en el registro');
      login(data.token, data.user);
      router.push('/dashboard');
    } catch (error) {
      setRegisterError(error instanceof Error ? error.message : 'Error en el registro');
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 rounded-t-lg font-bold text-lg transition-colors ${tab === 'login' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setTab('login')}
          >
            Iniciar Sesión
          </button>
          <button
            className={`px-6 py-2 rounded-t-lg font-bold text-lg transition-colors ${tab === 'register' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setTab('register')}
          >
            Crear Cuenta
          </button>
        </div>
        <div className="bg-white p-8 rounded-b-lg shadow-xl">
          {tab === 'login' ? (
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              {loginError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{loginError}</div>}
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input id="email" name="email" type="email" required value={loginData.email} onChange={handleLoginChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="tu@email.com" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <input id="password" name="password" type="password" required value={loginData.password} onChange={handleLoginChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Tu contraseña" />
                </div>
              </div>
              <button type="submit" disabled={loginLoading} className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {loginLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
              <div className="text-center text-sm text-gray-500 mt-2">
                ¿No tienes una cuenta?{' '}
                <button type="button" className="text-green-600 hover:underline" onClick={() => setTab('register')}>Regístrate aquí</button>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">Admin: admin@maldonado.com / admin123</p>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleRegisterSubmit}>
              {registerError && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{registerError}</div>}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo *</label>
                  <input id="name" name="name" type="text" required value={registerData.name} onChange={handleRegisterChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Tu nombre completo" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                  <input id="email" name="email" type="email" required value={registerData.email} onChange={handleRegisterChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="tu@email.com" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">Empresa (opcional)</label>
                  <input id="company" name="company" type="text" value={registerData.company} onChange={handleRegisterChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Nombre de tu empresa" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña *</label>
                  <input id="password" name="password" type="password" required value={registerData.password} onChange={handleRegisterChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Mínimo 6 caracteres" />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña *</label>
                  <input id="confirmPassword" name="confirmPassword" type="password" required value={registerData.confirmPassword} onChange={handleRegisterChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Repite tu contraseña" />
                </div>
              </div>
              <button type="submit" disabled={registerLoading} className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {registerLoading ? 'Registrando...' : 'Registrarse'}
              </button>
              <div className="text-center text-sm text-gray-500 mt-2">
                ¿Ya tienes una cuenta?{' '}
                <button type="button" className="text-green-600 hover:underline" onClick={() => setTab('login')}>Inicia sesión aquí</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 
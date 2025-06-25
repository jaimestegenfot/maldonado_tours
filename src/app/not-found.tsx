import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center p-8">
      <h1 className="text-5xl font-bold text-green-800 mb-6">Página en desarrollo</h1>
      <p className="text-lg text-green-700 mb-8">Esta sección está en proceso de desarrollo o la URL no existe.</p>
      <Link href="/" className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow">
        Volver al inicio
      </Link>
    </div>
  );
} 
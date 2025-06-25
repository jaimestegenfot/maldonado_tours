import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractTokenFromHeader } from './auth';

export async function authMiddleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = extractTokenFromHeader(authHeader || undefined);
  
  if (!token) {
    return NextResponse.json(
      { error: 'Token de autenticación requerido' },
      { status: 401 }
    );
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json(
      { error: 'Token inválido o expirado' },
      { status: 401 }
    );
  }

  // Agregar el usuario al request para uso posterior
  (request as any).user = payload;
  // No retornar NextResponse.next() en rutas API
  return undefined;
}

export async function adminMiddleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = extractTokenFromHeader(authHeader || undefined);
  
  if (!token) {
    return NextResponse.json(
      { error: 'Token de autenticación requerido' },
      { status: 401 }
    );
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json(
      { error: 'Token inválido o expirado' },
      { status: 401 }
    );
  }

  if (payload.role !== 'admin') {
    return NextResponse.json(
      { error: 'Acceso denegado. Se requieren permisos de administrador' },
      { status: 403 }
    );
  }

  (request as any).user = payload;
  // No retornar NextResponse.next() en rutas API
  return undefined;
} 
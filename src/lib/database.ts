import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

let db: any = null;

export async function getDatabase() {
  if (db) return db;
  
  db = await open({
    filename: path.join(process.cwd(), 'database.sqlite'),
    driver: sqlite3.Database
  });

  // Crear tablas si no existen
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      company TEXT,
      role TEXT DEFAULT 'operator',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS zones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      location TEXT NOT NULL,
      category_id INTEGER,
      price REAL,
      images TEXT,
      user_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories (id),
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `);

  // Insertar categorías por defecto
  await db.exec(`
    INSERT OR IGNORE INTO categories (name, description) VALUES 
    ('Playa', 'Hermosas playas y costas'),
    ('Montaña', 'Aventuras en la montaña'),
    ('Ciudad', 'Atracciones urbanas'),
    ('Histórico', 'Sitios históricos y culturales'),
    ('Naturaleza', 'Reservas naturales y parques'),
    ('Restaurante', 'Restaurantes y gastronomía local'),
    ('Hospedaje', 'Hoteles, hostales y alojamientos'),
    ('Ficho', 'Fichos, paradores y otros servicios');
  `);

  // Crear usuario administrador por defecto
  const bcrypt = require('bcryptjs');
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  await db.exec(`
    INSERT OR IGNORE INTO users (email, password, name, company, role) VALUES 
    ('admin@maldonado.com', '${adminPassword}', 'Administrador', 'Maldonado Tours', 'admin');
  `);

  return db;
}

export async function closeDatabase() {
  if (db) {
    await db.close();
    db = null;
  }
} 
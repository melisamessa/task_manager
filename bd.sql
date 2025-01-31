CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) UNIQUE NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(50) NOT NULL
);

CREATE TABLE categories(
	id SERIAL PRIMARY KEY,
	category_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE tasks(
	id SERIAL PRIMARY KEY,
	tittle VARCHAR(255) NOT NULL,
	description TEXT,
	status VARCHAR(50) CHECK (status IN ('Pendiente', 'En progreso', 'Completada')) NOT NULL,
	expiration_date DATE,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
	category_id INT REFERENCES categories(id) ON DELETE SET NULL,
	creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;
SELECT * FROM categories;
SELECT * FROM tasks;
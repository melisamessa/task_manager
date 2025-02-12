SELECT * FROM tasks;
SELECT * FROM users;
SELECT * FROM projects;SELECT * FROM tasks;
SELECT * FROM projects;

ALTER TABLE tasks DROP due_date;

DROP TABLE categories;

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE projects ADD COLUMN user_id INT NOT NULL;

ALTER TABLE projects ADD CONSTRAINT fk_projects_users
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE;

ALTER TABLE tasks ADD COLUMN project_id INT;

ALTER TABLE tasks ADD CONSTRAINT fk_tasks_projects
FOREIGN KEY (project_id) REFERENCES projects(id)
ON DELETE CASCADE;

ALTER TABLE projects ADD COLUMN complete BOOLEAN DEFAULT FALSE;


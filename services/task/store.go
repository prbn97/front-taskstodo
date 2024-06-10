package task

import (
	"database/sql"
	"fmt"

	"github.com/prbn97/tasklist/types"
)

type Store struct {
	db *sql.DB
}

func NewStore(db *sql.DB) *Store {
	return &Store{db: db}
}

func (s *Store) CreateTask(task types.Task) error {
	_, err := s.db.Exec("INSERT INTO tasks (userID, title, description, status) VALUES (?, ?, ?, ?)", task.UserID, task.Title, task.Description, task.Status)
	if err != nil {
		return err
	}

	return nil
}

func (s *Store) ListTasksByUserID(id int) ([]*types.Task, error) {
	rows, err := s.db.Query("SELECT * FROM tasks")
	if err != nil {
		return nil, err
	}

	tasks := make([]*types.Task, 0)
	for rows.Next() {
		task, err := scanRowsIntoTasks(rows)
		if err != nil {
			return nil, err
		}

		tasks = append(tasks, task)
	}

	return tasks, nil
}

func (s *Store) GetTaskByID(id int) (*types.Task, error) {
	rows, err := s.db.Query("SELECT * FROM tasks WHERE id = ?", id)
	if err != nil {
		return nil, err
	}

	task := new(types.Task)
	for rows.Next() {
		task, err = scanRowsIntoTasks(rows)
		if err != nil {
			return nil, err
		}
	}

	return task, nil
}

func (s *Store) UpdateTask(task types.Task) error {
	_, err := s.db.Exec("UPDATE tasks SET (userID, title, description, status) VALUES (?, ?, ?, ?)", task.UserID, task.Title, task.Description, task.Status)
	if err != nil {
		return err
	}

	return nil
}

func (s *Store) DeleteTask(id int) error {
	result, err := s.db.Exec("DELETE FROM tasks WHERE id = ?", id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return fmt.Errorf("task not found")
	}

	return nil
}

func scanRowsIntoTasks(rows *sql.Rows) (*types.Task, error) {
	task := new(types.Task)

	err := rows.Scan(
		&task.ID,
		&task.UserID,
		&task.Title,
		&task.Description,
		&task.Status,
		&task.CreatedAt,
	)
	if err != nil {
		return nil, err
	}

	return task, nil
}

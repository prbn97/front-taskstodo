package types

import (
	"time"
)

type UserStore interface {
	CreateUser(User) error
	GetUserByEmail(email string) (*User, error)
	GetUserByID(id int) (*User, error)
	UpdateUser(User) error
	DeleteUser(id int) error
}

type TaskStore interface {
	CreateTask(Task) error
	ListTasksByUserID(id int) ([]*Task, error)
	GetTaskByID(id int) (*Task, error)
	UpdateTask(Task) error
	DeleteTask(id int) error

	// CreateToDo(ToDo) error
	// ListToDos() ([]*ToDo, error)
	// GetToDoByID(id int) (*Task, error)
	// UpdateToDo(ToDo) error
	// DeleteToDo(id int) error
}

type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"namd"`
	NickName  string    `json:"nickName"`
	Email     string    `json:"email"`
	Password  string    `json:"-"`
	CreatedAt time.Time `json:"createdAt"`
}

type Task struct {
	ID          int       `json:"id"`
	UserID      int       `json:"userID"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"createdAt"`
}

// type ToDo struct {
// 	ID          int       `json:"id"`
// 	TaskID      int       `json:"taskID"`
// 	Title       string    `json:"title"`
// 	Description string    `json:"description"`
// 	Completed   bool      `json:"completed"`
// 	CreatedAt   time.Time `json:"createdAt"`
// }

type UserPayload struct {
	Name     string `json:"Name"`
	NickName string `json:"nickName"`
	Email    string `json:"email"`
	Password string `json:"password" validate:"required,min=3,max=130"`
}

type UserPayloadLogin struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type TaskPayLoad struct {
	UserID      int    `json:"userID"`
	Title       string `json:"title" validate:"required"`
	Description string `json:"description"`
}

package task

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/prbn97/tasklist/services/auth"
	"github.com/prbn97/tasklist/types"
	"github.com/prbn97/tasklist/utils"
)

type Handler struct {
	store     types.TaskStore
	userStore types.UserStore
}

func NewHandler(store types.TaskStore, userStore types.UserStore) *Handler {
	return &Handler{
		store:     store,
		userStore: userStore,
	}
}

func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/tasks", auth.WithJWTAuth(h.taskPOST, h.userStore)).Methods("POST")
	router.HandleFunc("/tasks", auth.WithJWTAuth(h.taskLIST, h.userStore)).Methods("GET")
	router.HandleFunc("/tasks/{id}", auth.WithJWTAuth(h.taskGET, h.userStore)).Methods("GET")
	router.HandleFunc("/tasks/{id}", auth.WithJWTAuth(h.taskPUT, h.userStore)).Methods("PUT")
	router.HandleFunc("/tasks/{id}", auth.WithJWTAuth(h.taskDELETE, h.userStore)).Methods("DELETE")
}

func validateID(r *http.Request) (int, error) {
	vars := mux.Vars(r)
	idStr, ok := vars["id"]
	if !ok {
		return 0, fmt.Errorf("missing task ID")
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		return 0, fmt.Errorf("invalid task ID")
	}

	return id, nil
}

func (h *Handler) taskPOST(w http.ResponseWriter, r *http.Request) {
	userID := auth.GetUserIDFromContext(r.Context())
	var task types.TaskPayLoad
	err := utils.ValidateFields(w, r, &task)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	task.UserID = userID
	newTask := types.Task{
		UserID:      task.UserID,
		Title:       task.Title,
		Description: task.Description,
		Status:      "pending",
	}

	err = h.store.CreateTask(newTask)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusCreated, newTask)
}

func (h *Handler) taskLIST(w http.ResponseWriter, r *http.Request) {
	userID := auth.GetUserIDFromContext(r.Context())

	tasks, err := h.store.ListTasksByUserID(userID)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, tasks)
}

func (h *Handler) taskGET(w http.ResponseWriter, r *http.Request) {
	userID := auth.GetUserIDFromContext(r.Context())
	id, err := validateID(r)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	task, err := h.store.GetTaskByID(id)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, err)
		return
	}

	if task.UserID != userID {
		utils.WriteError(w, http.StatusForbidden, fmt.Errorf("forbidden"))
		return
	}

	utils.WriteJSON(w, http.StatusOK, task)
}

func (h *Handler) taskPUT(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	str, ok := vars["id"]
	if !ok {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("missing user ID"))
		return
	}

	id, err := strconv.Atoi(str)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid user ID"))
		return
	}
	var updatedTask types.TaskPayLoad
	err = utils.ValidateFields(w, r, &updatedTask)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}
	task, err := h.store.GetTaskByID(id)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("not found id"))
		return
	}

	if updatedTask.Title == "" && updatedTask.Description == task.Description {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("at least a new task description field must be provided"))
		return
	}
	if updatedTask.Title == "" {
		updatedTask.Title = task.Title
	}
	if updatedTask.Title != task.Title {
		task.Title = updatedTask.Title
	}
	if updatedTask.Description != task.Description {
		task.Description = updatedTask.Description
	}

	err = h.store.UpdateTask(*task)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, task)
}

func (h *Handler) taskDELETE(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	str, ok := vars["id"]
	if !ok {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("missing user ID"))
		return
	}

	id, err := strconv.Atoi(str)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid user ID"))
		return
	}

	err = h.store.DeleteTask(id)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, fmt.Errorf("not found id"))
		return
	}

	utils.WriteJSON(w, http.StatusOK, nil)
}

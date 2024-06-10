package api

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/prbn97/tasklist/services/user"
)

type APIserver struct {
	addr string
	db   *sql.DB
}

func NewAPIserver(address string, database *sql.DB) *APIserver {

	return &APIserver{
		addr: address,
		db:   database,
	}
}

func (tasklist *APIserver) Run() error {

	// build API routes services
	router := mux.NewRouter()
	subrouter := router.PathPrefix("/api/v1").Subrouter()

	userStore := user.NewStore(tasklist.db)
	userHandler := user.NewHandler(userStore)
	userHandler.RegisterRoutes(subrouter)

	// build API routes services

	server := http.Server{
		Addr:    tasklist.addr,
		Handler: router,
	}

	log.Printf("Server has started %s", tasklist.addr)
	return server.ListenAndServe()

}

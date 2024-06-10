# tasklist
task list application

praticing the Go.T.H.A.M Stack.
(Go, Tailwind CSS, HTMX, a-h/templTempl, MySql)

praticing the Go + React Stack.
(Go, MySql, Docker, API Rest, API graphQL, Sass?, Botstrap? )

## Milestone #1 *Make task lists API rest*

API that have: 
Service of Users /login /register
Service of Tasks /tasks
Service of Authenticantion /auth


/tasklist/
    + /bin/
    + /cmd/
        - main.go
    + /db/
        - db.go
    + /docs/
        - openapi.yaml
        - documentation.html
    + /services/
        + /auth/
            - routes.go
            - store.go
        + /task/
            - routes.go
            - store.go
        + /user/
            - routes.go
            - store.go
    + /types/
        - types.go
    + /utils/
        - utils.go
    + /frontend/   # Novo diretório para o frontend em React
        + /REACT
    + /deploy/   # Novo diretório para arquivos de deployment
        - Dockerfile
        - docker-compose.yml
    - .env.example
    - .gitignore
    - go.mod
    - go.sum
    - LICENSE
    - Makefile   
    - README.md

## Milestone #2 *Make task lists UI*

 
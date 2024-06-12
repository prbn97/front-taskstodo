const Header = () => {
    return (
        <>
            <div className="row align-items-center">
                <div className="col d-flex justify-content-between align-items-center">
                    <h4 className="mt-3">*icon* Task to <span><strong>Do</strong></span></h4>
                    <nav>
                        <div className="d-flex justify-content-end">
                            <a href="#!" className="badge bg-warning mx-3">Create Task</a>
                            <a href="#!" className="badge bg-dark mx-3">Login</a>
                        </div>
                    </nav>
                </div>
                <hr className="mb-3" />
            </div>
        </>
    );
}

export default Header;
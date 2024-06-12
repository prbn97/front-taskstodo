import logo from './img/logo.svg';
const Home = () => {
    return (
        <>
            <div className="col">
                <div className="row text-center mt-4">
                    <h4><img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}List of <strong className='text-Dark'>Tasks</strong></h4>
                </div>
                <div className="row m-4">
                    <div className="col">

                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Task 1</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet quam sit amet purus molestie fermentum vel commodo libero. Suspendisse hendrerit turpis ut ullamcorper ornare.</p>
                                <span className="badge bg-danger">Status: ToDo</span>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Task 2</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet quam sit amet purus molestie fermentum vel commodo libero. Suspendisse hendrerit turpis ut ullamcorper ornare.</p>
                                <span className="badge bg-warning">Status: In Progress</span>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Task 3</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet quam sit amet purus molestie fermentum vel commodo libero. Suspendisse hendrerit turpis ut ullamcorper ornare.</p>
                                <span className="badge bg-success">Status: Completed</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}

export default Home;
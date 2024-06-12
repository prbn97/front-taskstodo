import logo from './img/logo.svg';
const CreateTask = () => {
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
                    />{' '}Create <strong className='text-Dark'>Tasks</strong></h4>
                </div>
            </div>
        </>
    );
}

export default CreateTask;
import logo from './img/logo.svg';
const Title = () => {
    return (
        <div className="d-flex align-items-center">
            <img
                alt="icon-title"
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top me-2"
            />
            <h4>
                {' '}List of <strong className="text-dark">Tasks</strong>
            </h4>
        </div>
    );
}

export default Title;
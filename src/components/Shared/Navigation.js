import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="nav-container">
            <div className="nav-logo">
                <img src='/img/nsl_logo.jpg' />
            </div>
            <div className="nav-items">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/players">Players</Link>
                <Link className="nav-link" to="/teamsetup">Teams</Link>
                <Link className="nav-link" to="/over">Over</Link>
                <Link className="nav-link" to="/gamestats">Game Results</Link>
            </div>
        </div>
    )
}

export default Navigation

import * as React from 'react';

function Header() {
    return (
        <header>
            <div className="container">
                <nav className="navbar">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-main" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <a className="navbar-brand" href="index.php"/>
                    </div>
                    <div className="collapse navbar-collapse" id="nav-main">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#">Datasets</a></li>
                            <li><a href="#">Organizaciones</a></li>
                            <li><a href="#">Series de tiempo</a></li>
                            <li><a href="#">APIs</a></li>
                            <li><a href="#">Acerca</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;

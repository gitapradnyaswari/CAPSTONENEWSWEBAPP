import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

  const links = [
    { title: "Indonesia", path: "/" },
    { title: "Programming", path: "/programming" },
    { title: "COVID-19", path: "/covid-19" },
    { title: "Saved", path: "/saved" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2">
      <div className="container-fluid">
        <div className="navbar-brand d-flex align-items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: "60px" }}
          />
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center w-100">
            {links.map((link) => (
              <li className="nav-item" key={link.title}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-warning" : "text-white"} fs-5 py-2 px-3 rounded`
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>

          <form className="d-flex ms-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-control me-2 shadow-sm"
              placeholder="Search..."
              aria-label="Search"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="btn btn-warning ms-2 shadow-sm"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
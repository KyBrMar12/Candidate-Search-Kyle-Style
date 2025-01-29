  // TODO: Add necessary code to display the navigation bar and link between the pages
  import { NavLink } from 'react-router-dom';

  const Nav = () => {
    const navStyle = {
      display: 'flex',
      gap: '1rem',
      padding: '1rem',
      backgroundColor: '#1a1a1a',
    };
  
    const activeStyle = {
      fontWeight: 'bold',
      color: 'coral',
    };
  
    return (
      <nav style={navStyle}>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Home
        </NavLink>
        <NavLink
          to="/SavedCandidates"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Potential Candidates
        </NavLink>
      </nav>
    );
  };
  
  export default Nav;
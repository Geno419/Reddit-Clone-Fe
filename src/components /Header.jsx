import { Link } from "react-router-dom";

export default function Header(props) {
  const { user } = props;
  return (
    <header>
      <Link to="/">
        <h1>GEDDIT</h1>
      </Link>
      <div className="userProfile">
        <aside>
          <p>{user.username}</p>
        </aside>
        <figure>
          <img src={user.avatar_url} alt={`${user.name} profile picture`} />
        </figure>
      </div>
    </header>
  );
}

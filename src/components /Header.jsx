import { Link } from "react-router-dom";

export default function Header(props) {
  const { user } = props;
  return (
    <header>
      <Link to="/">
        <h1>.GEDDIT.</h1>
      </Link>
      <figure className="userProfile">
        <img src={user.avatar_url} alt={`${user.name} profile picture`} />
      </figure>
    </header>
  );
}

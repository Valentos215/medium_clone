import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loading from "../../components/Loading";
import useFetch from "../../hooks/useFetch";
import UserArticles from "./components/UserArticles";

type UserProfileProps = {
  location: { pathname: string; search: string };
  match: { params: { slug: string }; url: string };
};

const UserProfile: React.FC<UserProfileProps> = ({ location, match }) => {
  const slug = match.params.slug;
  const isFavorites = location.pathname.includes("favorites");
  const apiUrl = `/profiles/${slug}`;
  const { isLoading, response, doFetch } = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading || !response) {
    return <Loading />;
  }
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img className="user-img" alt="" src={response.profile.image} />
              <h4>{response.profile.username}</h4>
              <p>{response.profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={`/profiles/${response.profile.username}`}
                    exact
                  >
                    My Posts
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to={`/profiles/${response.profile.username}/favorites`}
                  >
                    Favourites Posts
                  </NavLink>
                </li>
              </ul>
            </div>
            <UserArticles
              username={response.profile.username}
              location={location}
              isFavorites={isFavorites}
              url={match.url}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

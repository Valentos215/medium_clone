import useFetch from "../hooks/useFetch";
import classNames from "classnames";
import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../contexts/currentUser";
import { Redirect } from "react-router-dom";

type AddToFavoritesProps = {
  isFavorited: boolean;
  favoritesCount: number;
  articleSlug: string;
};

const AddToFavorites: React.FC<AddToFavoritesProps> = ({
  isFavorited,
  favoritesCount,
  articleSlug,
}) => {
  const [willRedirect, setWillRedirect] = useState(false);
  const [currentUserState] = useContext(CurrentUserContext);
  const apiUrl: string = `/articles/${articleSlug}/favorite`;
  const { response, doFetch } = useFetch(apiUrl);

  const actualCount = response
    ? response.article.favoritesCount
    : favoritesCount;
  const actualIsFavorited = response ? response.article.favorited : isFavorited;

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!currentUserState.isLoggedIn) setWillRedirect(true);
    e.preventDefault();
    doFetch({
      method: actualIsFavorited ? "delete" : "post",
    });
  };

  const buttonClasses = classNames({
    btn: true,
    "btn-sm": true,
    "btn-primary": actualIsFavorited,
    "btn-outline-primary": !actualIsFavorited,
  });

  if (willRedirect) {
    return <Redirect to="/login" />;
  }
  return (
    <button className={buttonClasses} onClick={handleLike}>
      <i className="ion-heart"></i>
      <span>&nbsp; {actualCount}</span>
    </button>
  );
};

export default AddToFavorites;

import useFetch from "../hooks/useFetch";
import classNames from "classnames";

const AddToFavorites = ({ isFavorited, favoritesCount, articleSlug }) => {
  const apiUrl = `/articles/${articleSlug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  const actualCount = response
    ? response.article.favoritesCount
    : favoritesCount;
  const actualIsFavorited = response ? response.article.favorited : isFavorited;
  const handleLike = (e) => {
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

  return (
    <button className={buttonClasses} onClick={handleLike}>
      <i className="ion-heart"></i>
      <span>&nbsp; {actualCount}</span>
    </button>
  );
};

export default AddToFavorites;

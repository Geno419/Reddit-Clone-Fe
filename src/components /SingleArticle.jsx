export default function SingleArticle(props) {
  const { singleArticle } = props;
  const date = new Date(singleArticle.created_at);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `Posted on the ${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year} at ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;

  console.log(formattedTime);
  console.log(singleArticle);
  return (
    <>
      <div>
        <figure>
          <img
            src={singleArticle.article_img_url}
            alt={`Image for ${singleArticle.authors} post`}
          />
        </figure>
        <section>
          <div className="title">
            <h3>{singleArticle.title}</h3>
          </div>
          <div article_author>
            <p>{singleArticle.author}</p>
          </div>
          <div className="article_details">
            <p>{`Votes: ${singleArticle.votes} `}</p>
            <p>{`comments: ${singleArticle.comment_count} `}</p>
          </div>
          <p>{formattedTime}</p>
        </section>
      </div>
    </>
  );
}

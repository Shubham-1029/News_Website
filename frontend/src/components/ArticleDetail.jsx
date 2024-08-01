import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleDetail } from "../api";
import "../components/css/ArticleDetail.css";
import { assets } from "../assets/asset";
import ArticleList from "./ArticleList";
import HTMLContent from "./HtmlContent";
import Header from "./Header";

const ArticleDetail = ({ content }) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await getArticleDetail(id);
        setArticle(response.data);
      } catch (error) {
        console.error("Failed to fetch article", error);
      }
    };
    fetchArticle();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZoneName: "short",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container-xxl article-detail">
      <Header/>
      <div className="row">
        <div className="col-2 extra-column"></div>
        <div className="col-7 article-items">
          <h1 className="article-detail-title align-article">
            {article.title}
          </h1>
          {article.subheading && (
            <h2 className="article-detail-subheading my-3 align-article">
              {article.subheading}
            </h2>)}
          
          <div className="article-actions-bar">
            <div className="listen-article">
              <div role="button" tabIndex="0" className="listen-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="$primary"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                  className="listen-icon"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.967 7.527q.04.345.034.695v.558A3 3 0 0 0 11 8h-1v6h1a3 3 0 0 0 3-3c-.002-.102 0-.5 0-.5V8.24a6.13 6.13 0 0 0-1.695-4.343l-.016-.017A6.13 6.13 0 0 0 7.977 2a6.13 6.13 0 0 0-4.283 1.897A6.13 6.13 0 0 0 2 8.24v2.26a2 2 0 0 0 0 .5v.04A3 3 0 0 0 5 14h1V8H5a3 3 0 0 0-2 .78v-.558A5.12 5.12 0 0 1 4.428 4.57 5.12 5.12 0 0 1 7.995 3h.011a5.12 5.12 0 0 1 3.566 1.57l.014.014a5.12 5.12 0 0 1 1.381 2.943M3 10.131v.429l-.007.06a1 1 0 0 0 0 .26l.007.06V11a2 2 0 0 0 2 2V9a2 2 0 0 0-1.327.52zm10 0-.673-.611A2 2 0 0 0 11 9v4a2 2 0 0 0 2-1.997z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="listen-time">7 min</div>
            </div>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:r0:"
              data-state="closed"
              aria-label="Share this article"
              className="share-news"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
                focusable="false"
                role="img"
                className="share-news-icon"
              >
                <path
                  fill="currentColor"
                  d="M8 .6v3.8h.1c-4.4 0-7.3 4.5-6.9 8.8.1.8.2 1.2.2 1.2l.2 1 .4-1.3c.8-2 2-4 6.2-3.9H8v4l7-6.9zm1 11.3V9.3h-.9c-3 0-4.8.5-6.2 2.9.5-3.3 2.7-6.8 6.2-6.8H9V3l4.5 4.4z"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:r1:"
              data-state="closed"
              aria-label="Save this article"
              className="save-article"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                role="img"
                className="save-article-icon"
                data-bookmark-status="notsaved"
              >
                <path d="M12 3v8.92l-3.38-2.7-.62-.5-.62.5L4 11.92V3zm1-1H3v12l5-4 5 4z"></path>
              </svg>
            </button>
            <button
              aria-label="Comment on this story"
              className="comments-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                role="img"
                className="comments-button-icon"
              >
                <path d="M14 14V2H2v9.47h8.18L12.43 13ZM3 10.52V3h10v9.23l-2.5-1.66Z"></path>
              </svg>
              <span
                style={{
                  color: "gray",
                  fontFamily: "Times New Roman",
                  fontSize: "0.87rem",
                }}
              >
                107
              </span>
            </button>
          </div>
          <div className="article-detail-image-container mb-4">
            {article.image && (
              <div className="image-wrapper">
                <img
                  className="img-fluid article-detail-image align-article"
                  src={article.image}
                  alt={article.title}
                />
                <p className="image-caption align-article">
                  {article.image_caption}
                </p>
              </div>
            )}
          </div>
          <div className="about-article">
            <p className="article-detail-author mx-3 px-3 mb-1">
              By {article.user}
            </p>
            <div className="article-time">
              <p className="article-detail-date mx-3 px-3 mb-4">
                Published {formatDate(article.created_at)}
              </p>
              <p className="article-detail-date mx-3 mb-4">
                Updated {formatDate(article.updated_at)}
              </p>
            </div>
          </div>
          <div className="article-contents">
            <HTMLContent content={article.content} className="htmldetail" />
          </div>
          <div className="article-share wpds-c-dhzjXW wpds-c-dhzjXW-idKpyXE-css overrideStyles test">
            <div
              id="gift-share-end"
              data-testid="gift-share-end"
              className="PJLV PJLV-iiaHaQH-css hide-for-print"
            >
              <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="radix-:r1:"
                data-state="closed"
                aria-label="Share this article"
                id="gift-share-popover-control-end"
                data-testid="gift-share-popover-control-end"
                className="wpds-c-kSOqLF wpds-c-kSOqLF-cWZnsQ-variant-secondary wpds-c-kSOqLF-eHdizY-density-default wpds-c-kSOqLF-ejCoEP-icon-left wpds-c-PJLV wpds-c-PJLV-dNrKMQ-placement-Shortcut focus-highlight"
              >
                <div
                  className="wpds-c-UazGY"
                  id="gift-share-shortcut"
                  data-testid="gift-share-shortcut"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="var(--wpds-colors-primary)"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    className="wpds-c-fVfumU "
                  >
                    <path
                      fill="currentColor"
                      d="M8 .6v3.8h.1c-4.4 0-7.3 4.5-6.9 8.8.1.8.2 1.2.2 1.2l.2 1 .4-1.3c.8-2 2-4 6.2-3.9H8v4l7-6.9zm1 11.3V9.3h-.9c-3 0-4.8.5-6.2 2.9.5-3.3 2.7-6.8 6.2-6.8H9V3l4.5 4.4z"
                    ></path>
                  </svg>
                  <div className="PJLV wpds-c-jTgHe">Share</div>
                </div>
              </button>
            </div>
            <div className="wpds-c-hcekgi">
              <div className="" data-qa="comments-btn-div">
                <button
                  aria-label="Scroll to the comments section"
                  data-qa="comments-btn"
                  className="wpds-c-kSOqLF comment-button wpds-c-kSOqLF-cWZnsQ-variant-secondary wpds-c-kSOqLF-eHdizY-density-default wpds-c-kSOqLF-ejCoEP-icon-left wpds-c-kSOqLF-igqYgPb-css comments hide-for-print"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    className="wpds-c-fBqPWp "
                  >
                    <path d="M14 14V2H2v9.47h8.18L12.43 13ZM3 10.52V3h10v9.23l-2.5-1.66Z"></path>
                  </svg>
                  <span></span>Comments
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="ad-placeholder-side col-3 extra-column">
        </div>
      </div>
      <div className="row">
        <div className="extra-column col-3"></div>
        <div className="col-4 more-from-post">
          <p>More From the Post &gt;</p>
          <ArticleList />
        </div>
        <div className="extra-column col-5"></div>
      </div>
    </div>
  );
};

export default ArticleDetail;

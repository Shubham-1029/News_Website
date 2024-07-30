import PropTypes from "prop-types";

const HTMLContent = ({ content }) => {
  return (
    <div
      className="html-content"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};

HTMLContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default HTMLContent;

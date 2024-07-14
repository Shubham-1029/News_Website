import { useParams } from 'react-router-dom';
import ArticleDetail from '../ArticleDetail';
import ArticleList from '../ArticleList';
import './ArticlePage.css'
const ArticlePage = () => {
  const { id } = useParams();

  return (
    <div className="container article-page">
      <div className="row">
        <div className="col-md-10">
          <ArticleDetail />
        </div>
        <div className="col-md-2">
          <ArticleList />
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;

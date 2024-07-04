import ArticleList from "../ArticleList"
import Footer from "../Footer"
import LatestArticle from "../LatestArticle"
import Navbar from "../Navbar"

function Home() {
    return (
        <div>
            <Navbar />
            <ArticleList />
            <LatestArticle />
            <Footer />
        </div>


    )
}

export default Home
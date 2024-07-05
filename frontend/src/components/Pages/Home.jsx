import ArticleList from "../ArticleList"
import Footer from "../Footer"
import LatestArticle from "../LatestArticle"
import Navbar from "../Navbar"
import TagInput from "../TagInput"

function Home() {
    return (
        <div>
            <Navbar />
            <ArticleList />
            <LatestArticle />
            {/* <TagInput /> */}
            <Footer />
        </div>


    )
}

export default Home
import ArticleList from "../ArticleList"
import Footer from "../Footer"
import Header from "../Header"
import LatestArticle from "../LatestArticle"
import Navbar from "../Navbar"
import Sidebar from "../Sidebar"

function Home() {
    return (
        <div>
            <Navbar />
            <Header />
            <Sidebar />
            <ArticleList />
            <LatestArticle />
            <Footer />
        </div>


    )
}

export default Home
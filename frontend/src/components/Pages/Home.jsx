import ArticleList from "../ArticleList"
import Footer from "../Footer"
import Header from "../Header"
import Navbar from "../Navbar"

function Home() {
    return (
        <div><Navbar />
            <Header />
            <ArticleList />
            <Footer />
        </div>


    )
}

export default Home
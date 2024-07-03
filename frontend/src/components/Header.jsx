import { assets } from '../assets/asset';


const Header = () => {
  return (
    <div className="jumbotron jumbotron-fluid bg-light">
      <div className="text-center header-text">The Washington Post</div>
      <div className="header-container">
        <div id="headerCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={assets.image1} className="d-block img-reduced" alt="Image 1" />
            </div>
            <div className="carousel-item">
              <img src={assets.image2} className="d-block img-reduced" alt="Image 2" />
            </div>
            <div className="carousel-item">
              <img src={assets.image3} className="d-block img-reduced" alt="Image 3" />
            </div>
            <div className="carousel-item">
              <img src={assets.image4} className="d-block img-reduced" alt="Image 4" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#headerCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#headerCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

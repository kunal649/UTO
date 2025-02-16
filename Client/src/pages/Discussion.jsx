import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./blogstyle.css";


const BlogComponent = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  if( !user ) {
    navigate("/login");
  }

  const blogPosts = [
    {
      imgSrc: "https://i.pinimg.com/736x/48/79/48/4879483b2db8cc9f569351d26bef8098.jpg",
      title: "Understanding the Different Types of PCOS and Effective Treatment",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente incidunt culpa, at praesentium ut voluptate.",
      authorImg: "https://i.pinimg.com/736x/a9/29/17/a92917321a4d1866e5aace86eaf94726.jpg",
      authorName: "Louisa May",
      date: "Sept 19, 2021",
      rating: "4.5/5"
    },
    {
      imgSrc: "https://i.pinimg.com/736x/01/d3/db/01d3dbe4590af6afdbf0ceb017a89d70.jpg",
      title: "What People Think PCOS Is",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente incidunt culpa, at praesentium ut voluptate.",
      authorImg: "https://i.pinimg.com/736x/0e/3f/82/0e3f82860343fd6f0eacb59f7e0faf32.jpg",
      authorName: "John Doe",
      date: "Oct 20, 2021",
      rating: "4.3/5"
    },
    // Add other blog posts here
  ];

  return (
    <div className="bodycontainer">
      <div className="container">
        <header className="headercontainer">
          <h1>Dare To Know</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti aliquid voluptates recusandae, blanditiis
            reiciendis animi quia nemo velit, adipisci amet laboriosam enim incidunt doloremque id.
          </p>
        </header>
        <div className="maincontainer">
          {blogPosts.map((post, index) => (
            <div className="cardcontainer" key={index}>
              <a href="#" className="cardimagecontainer">
                <img src={post.imgSrc} alt="blog post" className="cardimage" loading="lazy" />
              </a>
              <div className="cardtitlecontainer">
                <a href="#" className="cardtitleanchor">
                  <h2 className="cardtitle">{post.title}</h2>
                </a>
                <p className="carddescription">{post.description}</p>
              </div>
              <div className="cardfootercontainer">
                <div className="authorcontainer">
                  <div className="authoravtarcontainer">
                    <img src={post.authorImg} alt="author" loading="lazy" className="authoravtar" />
                  </div>
                  <div className="authorinfocontainer">
                    <span className="authorname">{post.authorName}</span>
                    <span className="date">{post.date}</span>
                  </div>
                </div>
                <div className="cardtagcontainer">
                  <span>&#42611; {post.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogComponent;

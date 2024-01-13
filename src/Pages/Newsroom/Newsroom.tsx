import NavPostAuth from "../../Component/NavPostAuth/NavPostAuth";
import NewsroomHero from "../../Component/NewsroomHero/NewsroomHero";

function Newsroom() {

  return (
    <div>
      <NavPostAuth />
      <NewsroomHero />
      <h1>Blog Page</h1>
      {/* Add your blog content here */}
    </div>
  );
};

export default Newsroom;

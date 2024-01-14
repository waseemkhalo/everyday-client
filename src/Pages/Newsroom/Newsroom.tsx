import NavPostAuth from "../../Component/NavPostAuth/NavPostAuth";
import NewsroomHero from "../../Component/NewsroomHero/NewsroomHero";
import NewsroomMain from "../../Component/NewsroomMain/NewsroomMain";

function Newsroom() {

  return (
    <div>
      <NavPostAuth />
      <NewsroomHero />
      <NewsroomMain />
      <h1>Blog Page</h1>
      {/* Add your blog content here */}
    </div>
  );
};

export default Newsroom;

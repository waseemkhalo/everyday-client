import NavPostAuth from "../../Component/NavPostAuth/NavPostAuth";
import NewsroomHero from "../../Component/NewsroomHero/NewsroomHero";
import NewsroomMain from "../../Component/NewsroomMain/NewsroomMain";

function Newsroom() {

  return (
    <div>
      <NavPostAuth />
      <NewsroomHero />
      <NewsroomMain />
      {/* Add your blog content here */}
    </div>
  );
};

export default Newsroom;

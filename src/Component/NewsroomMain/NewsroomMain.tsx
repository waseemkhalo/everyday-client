// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
import './NewsroomMain.scss';
import { useState, useEffect } from 'react';
import { getAllNews } from '../../services/newsroomService';


function NewsroomMain() {
  const [currentArticles, setCurrentArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await getAllNews();
      setCurrentArticles(currentArticles);
      setLoading(false);
    }
    fetchArticles();
    console.log(currentArticles);
  }
  )


  return (
    <>
      {/* Render your articles here */}
      <div className='news__container'>
        <div className="news">
          <div className='news__main-image'>
            {/* <svg className='news__main-image--picture' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FF0066" d="M45.5,-69.8C58.9,-71,69.9,-58.8,76.1,-45C82.2,-31.1,83.6,-15.6,83.3,-0.2C83,15.2,81,30.4,74.1,43C67.2,55.5,55.3,65.5,42.2,66.2C29,66.8,14.5,58.3,-0.8,59.7C-16.2,61.2,-32.4,72.6,-43.7,70.9C-55.1,69.2,-61.6,54.3,-62.9,40.3C-64.2,26.2,-60.2,13.1,-58.2,1.1C-56.3,-10.9,-56.4,-21.7,-50.8,-28.4C-45.3,-35.1,-34.2,-37.5,-24.8,-38.7C-15.4,-39.8,-7.7,-39.6,4.2,-46.8C16,-54,32,-68.5,45.5,-69.8Z" transform="translate(100 100)" />
            </svg> */}
          </div>
          <div className='news__main-content'>
            <h3 className=''>Release</h3>
            <h1 className='news__main-title'>Article 1</h1>
            <span>date</span>
          </div>
        </div>
      </div>

    </>
  );
}


export default NewsroomMain;

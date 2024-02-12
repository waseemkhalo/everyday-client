// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
import './NewsroomMain.scss';
import { useState, useEffect } from 'react';
import { getAllNews } from '../../services/newsroomService';
import { Link } from 'react-router-dom';


function NewsroomMain() {


  const [currentArticles, setCurrentArticles] = useState<any[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch news articles using the service function
        const fetchedNews = await getAllNews();
        setCurrentArticles(fetchedNews); // Update state with fetched news articles
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchData(); 
  }, []);

  // const formatDate = (timestamp: string) => {
  //   const date = new Date(currentArticles.[0].date_created);
  //   return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  // }; 

  return (

    <div>
      {currentArticles.length === 0 ? (
        <p>No news articles found.</p>
      ) : (
        <ul>
          {currentArticles.map((article: any) => (
            <li key={article.id}>
              <Link to={`/newsroom/${article.id}`}>
                <div className='news__container'>
                  <div className='news'>
                    <div className='news__main-image' />
                    <div className='news__main-content'>
                      <h2 className='news__main-title sm:text-md lg:text-3xl font-bold'>{article.title}</h2>
                      <p>{article.type}</p>
                      <p>Author: {article.author}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};



export default NewsroomMain;

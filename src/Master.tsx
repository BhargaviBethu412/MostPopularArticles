import "./styles.css";

import React, { useState, useEffect } from 'react';


export default function Master() {
  const [showArticles, setShowArticles] = useState(false);
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);

  const populateArticles = async () => {
    fetch("https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=Ay7sDFNBzUbNGu3QfQQfm8Xj9EkgYuY3")
    .then((resp) => resp.json())
    .then((json) => setArticles(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
    setShowArticles(true);
  };
  const showDetail = async(e, articleID) =>{
    e.preventDefault();
    for(var i=0;i< articles.results.length;i++){
      if(articles.results[i].id == articleID){
        if(document.getElementById(articleID)){
          if(document.getElementById(articleID).className == 'showblock'){
            document.getElementById(articleID).className = 'hideblock';
          }else{
            document.getElementById(articleID).className = 'showblock';
          }
        }
      }else{
        if(document.getElementById(articles.results[i].id))
        document.getElementById(articles.results[i].id).className = 'hideblock';
      }
    }
  }
  
  useEffect(() => {
    populateArticles();
  }, []);

  return (
    <>
   
   <div><h2>Most Popular Articles</h2></div>
   
   {!loading && articles.results && ( 
   <ul id ="ArticleList">
    {articles.results.map((article) =>
   <>
   {article.type == 'Article' && (
   <li> 
   <a href="#" onClick={(e) => {showDetail(e, article.id)}}>{article.title}</a>
   <div id={article.id} className="hideblock">
    <p> <strong>Title:</strong> {article.title} <br/>
    <strong>Source:</strong> {article.source} <br/>
    <strong>Abstract:</strong> {article.abstract} <br/>
    <strong>Keywords:</strong> {article.adx_keywords} <br/><br/>
    More details and opinion of article <a href={article.url}>click here</a>
    
    </p>
   </div>
   </li>

   )}
   </>
   )}
 </ul>
   )}
      </>
  );
}

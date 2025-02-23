import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Charts = () => {
  const [genreCounts, setGenreCounts] = useState({});
  const [dataScores, setDataScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const movieResponse = await fetch('https://mvcfolder-api.onrender.com/api/v1/movies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const seriesResponse = await fetch('https://mvcfolder-api.onrender.com/api/v1/series', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const moviesData = await movieResponse.json();
        const seriesData = await seriesResponse.json();

        const allGenres = [...moviesData.data, ...seriesData.data];

        const genreCount = {};

        allGenres.forEach((item) => {
          item.genre.forEach((genre) => {
            genreCount[genre] = (genreCount[genre] || 0) + 1;
          });
        });

        setGenreCounts(genreCount);
        setLoading(false);  
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData(); 
  }, []);
  useEffect(()=>{
    const token = localStorage.getItem('token');

    const fetchScore = async () => {
      try {
        const movieResponse = await fetch('https://mvcfolder-api.onrender.com/api/v1/movies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const seriesResponse = await fetch('https://mvcfolder-api.onrender.com/api/v1/series', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const moviesData = await movieResponse.json();
        const seriesData = await seriesResponse.json();

        const allData = [...moviesData.data, ...seriesData.data];

        const imdbScores = allData.map(item => ({
          title: item.title,
          imdbScore: item.imdbScore,
        }));

        setDataScores(imdbScores);  
        setLoading(false);  
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchScore();  
  },[])
  const data = {
    labels: Object.keys(genreCounts), 
    datasets: [
      {
        label: 'Popular Genre Count',
        data: Object.values(genreCounts),  
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
      },
    ],
  };
  const imdbScore = {
    labels: dataScores.map(item => item.title),  
    datasets: [
      {
        label: 'IMDB Score',
        data: dataScores.map(item => item.imdbScore),  
        backgroundColor: 'yellow',
        borderColor: 'yellow',
        borderWidth: 1,
      },
    ],
  };
  if (loading) {
    return <div>Loading...</div>;  
  }

  return (
    <div>
      <Link to="/admin/dashboard" className="bg-black text-white rounded p-1 m-1">&lt;</Link>
      <div>
        <h2 className='text-3xl ml-1 font-semibold'>Popular Genres</h2>
        <Bar data={data} />
      </div>
      <div className='mt-12'>
        <h2 className='text-3xl ml-1 font-semibold'>Imdb Scores</h2>
        <Bar data={imdbScore} />
      </div>
    </div>
  );
};

export default Charts;

import { useEffect, useState } from 'react'
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres  } from './store/homeSlice';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Header from "./components/header/Header"; 
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";



function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state)=>state.home)
  // console.log("url", url); 

  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  }, [])
  
  const fetchApiConfig = ()=>{
    fetchDataFromApi('/configuration').then((res)=>{
      // console.log("res", res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url))
    })
  }

  const genresCall = async () => {
    let promises = []
    let endPoints = ["tv", "movie"]
    let allGenres = {}

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises);
    data.map(({genres}) => {
      return genres.map((item) => (allGenres[item.id] = item))
    })

    dispatch(getGenres(allGenres))
  }

  return (
    <div className='App'>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          {/* :mediaType->movie or tv show, :id->id of that movie/tvShow */}
          <Route path='/:mediaType/:id' element={<Details/>} /> 
          {/* :query-> whatever we have searched */}
          <Route path='/search/:query' element={<SearchResult/>} />
          <Route path='/explore/:mediaType' element={<Explore/>} />
          <Route path='*' element={<PageNotFound/>} />
        </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App

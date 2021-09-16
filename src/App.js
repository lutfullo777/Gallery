import './App.css';
import axios from 'axios';
import React,{useState} from 'react'
import ResponsiveGallery from 'react-responsive-gallery';


function App() {

  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('london')
  const [page, setPage] = useState(1)
  const [value, setValue] = useState('')

  const getImages = async () => {
    let newImage=[]
    const {data} = await  axios.get(`https://api.unsplash.com/search/photos?page=${page}&per_page=20&query=${search}&client_id=FtpyN9D7SPUDVb-DKPu2c2OWbUzHpNpSCTk9f8vJIlo`)

    data.results.map((image)=>{
      return newImage.push({src:image.urls.regular,lightboxTitle:image.alt_description?image.alt_description.toUpperCase():'Awesome Image',lightboxCaption:image.user.name?`Taken by ${image.user.name}`:'John Doe'})
    })
    setImages([...images,...newImage])
  }

  document.addEventListener("DOMContentLoaded", () => {
    getImages()
});

const moreImage = () => {
  setPage(page+1)
  getImages()
}

const onClickHandler = async() =>{
  setSearch(value)
  if(value.length>0){
    let newImage=[]
    const {data} = await  axios.get(`https://api.unsplash.com/search/photos?page=${page}&per_page=20&query=${search}&client_id=FtpyN9D7SPUDVb-DKPu2c2OWbUzHpNpSCTk9f8vJIlo`)

    data.results.map((image)=>{
      return newImage.push({src:image.urls.regular,lightboxTitle:image.alt_description?image.alt_description.toUpperCase():'Awesome Image',lightboxCaption:image.user.name?`Taken by ${image.user.name}`:'John Doe'})
    })
    setImages([...newImage])
  }
}


  return (
    <div className="App">
      <div style={{display:'flex',alignItems:'center',width:'400px',margin:'10px auto'}}>
      <input onChange={(e)=>setValue(e.target.value)} placeholder='Input for search images' style={{width:'300px',height:'40px',outline:'none',borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px',padding:'0 10px', border:'2px solid #28c8ff',fontSize:'1.2em'}}/>
      <button onClick={onClickHandler} style={{width:'80px',height:'40px', backgroundColor:'#28c8ff', borderTopRightRadius:'10px',borderBottomRightRadius:'10px',border:'none',margin:'0',color:'#fff',fontSize:'1.1em',cursor:'pointer'}}>Search</button>
      </div>
      <h3>Click image for zoom</h3>
      <ResponsiveGallery images={images} useLightBox={true} colsPadding={{xs: 6,s: 6,m: 6,l: 8,xl: 8,xxl:8}} imagesPaddingBottom={{xs: 6,s: 6,m: 6,l: 8,xl: 8,xxl:8}} numOfImagesPerRow={{xs: 2,s: 2,m: 3,l: 3,xl: 4,xxl:4}}/>
      <button onClick={moreImage} style={{width:'200px', height:'40px', backgroundColor:'#28c8ff',cursor:'pointer', border:'none', borderRadius:'40px',fontSize:'1.4em',color:'#fff'}}>See More</button>
    </div>
  );
}

export default App;

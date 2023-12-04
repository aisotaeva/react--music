import { Input } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Track from '../components/track/Track'
import './MainPage.scss'

const searchMusic =(text,tracks) =>{
    if (text.trim().length === 0) return tracks;

    const lowerText = text.toLowerCase()

    const foundTracks = tracks.filter(item=>{
        return item.title.toLowerCase().includes(lowerText) ||
        item.artists.toLowerCase().includes(lowerText)
    })
    return foundTracks;
}


const MainPage = () => {
    const [data,setData] = useState([])
    const [text,setText] = useState("")

    useEffect(() => { 
        const fetchMusics = async ()=> {
            const{data} = await axios.get('/db.json')
            console.log(data);
            setData(data)
        }
        fetchMusics()
    }, [])

    const handleChange = ({target}) => {
        const inputValue = target.value
        setText(inputValue)
    }


    if(data.length === 0) return <h4>Loading...</h4>
  return (
    <div className='search'>
        <Input onChange={handleChange}className='input' placeholder='Поиск треков'/>
        <div className='list'>
            {searchMusic(text,data).map(track => <Track key= {track.id} track={track} />)}
        </div>
    </div>
  )
}

export default MainPage
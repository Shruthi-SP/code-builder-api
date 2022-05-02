import { Button } from '@mui/material'
import { useState } from 'react'
import img1 from '../pics/img1.png'
import img2 from '../pics/img2.png'
import img3 from '../pics/img3.png'
import img4 from '../pics/img4.png'
const Demo = (props) => {
    const [images, setImages] = useState({ index: 0, picList: [img1, img2, img3, img4] })

    const handleClickNext = () => {
        if (images.index + 1 === images.picList.length) {
            const obj = { ...images, index: 0 }
            setImages(obj)
        } else {
            const obj = { ...images, index: images.index + 1 }
            setImages(obj)
        }
    }
    const handleClickPrev = () => {
        if (images.index - 1 === -1) {
            const obj = { ...images, index: images.picList.length - 1 }
            setImages(obj)
        } else {
            const obj = { ...images, index: images.index - 1 }
            setImages(obj)
        }
    }
    return <div>
        <img src={images.picList[images.index]} style={{ height: '60%', width: '60%' }} /> <br />
        <Button variant='contained' size='small' onClick={handleClickPrev}> Previous </Button>
        <Button variant='contained' size='small' sx={{ ml: 1}} onClick={handleClickNext}> Next </Button>
    </div>
}
export default Demo
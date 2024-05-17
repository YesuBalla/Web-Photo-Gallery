import './index.css'

const ImageItem = (props) => {
    const {imageDetails} = props 
    const {thumbnailUrl, fullImageUrl} = imageDetails

    return (
        <li className='image-item'>
            <a href={fullImageUrl}>
                <img src={thumbnailUrl} alt='thumbnail' className='thumb-image' />
            </a>
        </li>
    )
}

export default ImageItem
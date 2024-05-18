import {Component} from 'react' 
import { createApi } from 'unsplash-js'
import { ShimmerSimpleGallery } from "react-shimmer-effects"

import { CiSearch } from "react-icons/ci"
import TabItem from '../TabItem'
import ImageItem from '../ImageItem'

import './index.css'

const tabsList = [
    {tabId: 'MOUNTAIN', displayText: 'Mountain'},
    {tabId: 'FLOWERS', displayText: 'Flowers'},
    {tabId: 'BEACHES', displayText: 'Beaches'},
    {tabId: 'CITIES', displayText: 'Cities'}
]

const unsplash = createApi({
    accessKey: '4tV8dNpCbJWU3H5kztmso-oltwYqhjlNUxyUhdwE6Pk',
  });

class WebGallery extends Component {
    state = {
        searchInput: tabsList[0].tabId,
        activeTabId: tabsList[0].tabId,
        imagesData: [],
        isLoading: true,
    }

    componentDidMount() {
        this.getImagesData()
    }

    getImagesData = async() => {
        const {searchInput} = this.state
        const responseData = await unsplash.search.getCollections({
            query: `${searchInput}`,
            page: 1,
            perPage: 10,
          });
        const updatedData = responseData.response.results.map((eachItem) => ({
            id: eachItem.id,
            title: eachItem.title,
            thumbnailUrl: eachItem.cover_photo.urls.thumb,
            fullImageUrl: eachItem.cover_photo.urls.full,
        }))

        this.setState({imagesData: updatedData, isLoading: false})

    }

    setActiveTabId = (tabId) => {
        this.setState({activeTabId: tabId, searchInput: tabId, isLoading: true}, this.getImagesData)
    } 

    onChangeSearchInput = event => {
        this.setState({searchInput: event.target.value})
    }

    getSearchResults = () => {
        this.getImagesData()
    }

    render() {
        const {activeTabId, imagesData, isLoading} = this.state
        return (
            

            <div className='app-container'>
                <div className='web-gallery'>
                    <h1 className='heading'>Web Gallery</h1>
                    <div className='search-input-container'>
                        <input type='search' placeholder='Search' className='search-input' onChange={this.onChangeSearchInput} />
                        <button type='button' onClick={this.getSearchResults} className='search-button'>
                            <CiSearch size={25} />
                        </button>
                    </div>
                    <ul className='tabs-list'>
                        {tabsList.map((eachTab) => (<TabItem key={eachTab.tabId} tabDetails={eachTab} setActiveTabId={this.setActiveTabId} isActive={eachTab.tabId === activeTabId} />))}
                    </ul>
                    {isLoading && <ShimmerSimpleGallery card imageHeight={190}  />}
                    <ul className='images-list'>
                        {imagesData.map((eachItem) => (<ImageItem key={eachItem.id} imageDetails={eachItem} />))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default WebGallery
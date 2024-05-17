import {Component} from 'react' 

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



class WebGallery extends Component {
    state = {
        searchInput: '',
        activeTabId: tabsList[0].tabId,
        imagesData: []
    }

    componentDidMount() {
        this.getImagesData()
    }

    getImagesData = async() => {
        const {searchInput} = this.state
        const url = `https://api.unsplash.com/photos?query=${searchInput}>;`
        const options = {
            headers: {
                Authorization: 'Client-ID 4tV8dNpCbJWU3H5kztmso-oltwYqhjlNUxyUhdwE6Pk',
            },
            method: 'GET'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        const updatedData = data.map((eachItem) => ({
            id: eachItem.id,
            thumbnailUrl: eachItem.urls.thumb,
            altDescription: eachItem.alt_description,
            fullImageUrl: eachItem.urls.full,
        }))

        this.setState({imagesData: updatedData})
    }

    setActiveTabId = (tabId) => {
        this.setState({activeTabId: tabId})
    } 

    onChangeSearchInput = event => {
        this.setState({searchInput: event.target.value})
    }

    getSearchResults = () => {
        this.getImagesData()
    }

    render() {
        const {searchInput, activeTabId, imagesData} = this.state
        return (
            <div className='app-container'>
                <div className='web-gallery'>
                    <h1 className='heading'>Web Gallery</h1>
                    <div className='search-input-container'>
                        <input type='search' placeholder='Search' className='search-input' value={searchInput} onChange={this.onChangeSearchInput} />
                        <button type='button' onClick={this.getSearchResults} className='search-button'>
                            <CiSearch size={25} />
                        </button>
                    </div>
                    <ul className='tabs-list'>
                        {tabsList.map((eachTab) => (<TabItem key={eachTab.tabId} tabDetails={eachTab} setActiveTabId={this.setActiveTabId} isActive={eachTab.tabId === activeTabId} />))}
                    </ul>
                    <ul className='images-list'>
                        {imagesData.map((eachItem) => (<ImageItem key={eachItem.id} imageDetails={eachItem} />))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default WebGallery
import React from 'react'

function Modal({show, item}) {
    if(!show)
    {
        return null;
    }
    let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
  return (
    <>
    <div className=''>
        <div className=''>
            <button className=''>x</button>
            <div className=''>
                <img src={thumbnail} alt=''/>
            </div>
            <div className=''>
                <h1>{item.volumeInfo.title}</h1>
                <h3>{item.volumeInfo.authors}</h3>
                <h4>{item.volumeInfo.publisher}</h4><span>{item.volumeInfo.publishedDate}</span>
                <a href='#'>{item.volumeInfo.previewLink}<button>more</button></a>
            </div>
            <h4 className=''>{item.volumeInfo.description}</h4>
        </div>
    </div>
    </>
    
  )
}

export default Modal
import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import UserContext from './UserContext';
import Loader from '../Loader';

function Photos({ photos, setSelectedImg }) {

    const { selectedImg, dispatchUserEvent } = useContext(UserContext);

    return (
        <div className=" border-t border-gray-300 mt-8 pt-4">
            <div className="grid grid-cols-3 gap-4 mt-4 mb-12 mx-4">
                {!photos ? (
                    <>
                        <Loader />
                        {/* <Skeleton count={12} width={320} height={400} /> */}
                    </>
                ) : (
                    photos.length > 0 ? (
                        photos.map((photo) => (
                            <div key={photo.docId} className="relative group  h-28 sm:h-48 md:h-64" onClick={() => dispatchUserEvent('SHOW_PHOTO', photo)}>
                                <img src={photo.imageSrc}
                                    alt={photo.caption} className="object-cover w-full h-full" />
                                <div className="absolute bottom-0 left-0 w-full h-full 
                                    justify-evenly items-center bg-gray-500 bg-opacity-50 
                                    group-hover:flex hidden">
                                    <p className="flex justify-between items-center text-white font-bold">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor"
                                            className="w-8 mr-2">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        {photo.likes.length}
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-5" viewBox="0 0 20 20" fill="currentColor"
                                            className="w-8 h-8 ml-8 mr-2">
                                            <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
                                        </svg>
                                        {photo.comments.length}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : null
                )
                }
            </div >
            {photos && (photos.length === 0 && <p className="text-center text-2xl">
                No Posts Yet
            </p>)}
        </div >
    )
}

Photos.propTypes = {
    photos: PropTypes.array.isRequired,
}

export default Photos

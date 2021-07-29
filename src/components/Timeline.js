import { useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import UsePhotos from '../hooks/UsePhotos';
import UseUser from '../hooks/UseUser';
import { getBase64 } from '../services/Default';
import { savePost } from '../services/Firbase';
import Post from './post/PostIndex';
import { ToastContainer, toast, zoom, bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';

function Timeline() {
    const { photos } = UsePhotos();
    const { user } = UseUser();



    const onSelectHandler = (e) => {
        getBase64(e.target.files[0])
            .then(result => {
                savePost(user, result)
            })
            .catch(err => {
            });
    }



    return (
        <div className="container col-span-3 md:col-span-2 ">
            <div className=" flex items-center px-4 mx-4 mb-0 mt-28 md:mt-0">
                <div className=" flex flex-col h-0 w-2/5 border border-gray-500"></div>
                <div className=" flex flex-col items-center w-1/5 py-2">
                    <label for="file-upload">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clip-rule="evenodd" />
                        </svg>
                    </label>
                </div>
                <div className=" flex flex-col h-0 w-2/5 border border-gray-500"></div>
            </div>
            <p className="text-center mx-6 sm:mx-4 lg:ml-0 mx-auto mb-4">please upload a file less than 1MB, or else it will not upload</p>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <input
                type="file"
                id="file-upload"
                hidden
                accept=".jpeg, .png, .jpg"
                onChange={onSelectHandler}
            />

            {
                !photos ? (
                    <>
                        <Loader />
                        {/* <Skeleton count={1} className="mb-5 w-auto h-auto" /> */}
                    </>
                ) : (
                    photos.length > 0 ?
                        (photos.map((content) =>
                            <Post key={content.docId} content={content} />)
                        )
                        : (
                            <p className="text-center text-2xl">
                                Follow pages to see photos
                            </p>
                        )
                )
            }
        </div >
    )
}

export default Timeline

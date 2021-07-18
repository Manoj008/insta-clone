import React, { useContext, useEffect, useRef } from 'react'
import PostActions from '../post/PostActions';
import PostComments from '../post/PostComments';
import PostFooter from '../post/PostFooter';
import UserContext from './UserContext';

const Modal = () => {

    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();

    const { selectedImg, dispatchUserEvent } = useContext(UserContext);


    const handleClick = (e) => {
        if (e.target.classList.contains("backdrop-filter")) {
            dispatchUserEvent('HIDE_PHOTO', {});
        }
    }

    return (
        <div className="fixed flex w-full h-full justify-center items-center inset-0 start-0 top-0 backdrop-filter backdrop-blur-sm"
            onClick={handleClick}>
            <div className=" pb-8 md:pb-0 overflow-y-auto md:fixed md:flex  justify-center max-h-full inset-y-2 max-w-2xl my-16 bg-gray-200 shadow-2xl rounded-md">
                < img src={selectedImg.imageSrc} alt="enlarged image"
                    className=" object-scale-down rounded-md flex-shrink-0" />
                <div className="pl-3 w-full overflow-y-auto">
                    <PostActions
                        docId={selectedImg.docId}
                        totalLikes={selectedImg.likes.length}
                        likedPhoto={selectedImg.userLikedPhoto}
                        handleFocus={handleFocus}
                    />
                    <PostFooter caption={selectedImg.caption} username={selectedImg.name} />
                    <PostComments
                        docId={selectedImg.docId}
                        comments={selectedImg.comments}
                        posted={selectedImg.dateCreated}
                        commentInput={commentInput} />
                </div>
                <div className="absolute right-0 top-0 bg-gray-300" onClick={() => dispatchUserEvent('HIDE_PHOTO', {})}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div >
        </div >
    )
}

export default Modal

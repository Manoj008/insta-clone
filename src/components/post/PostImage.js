import React from 'react';
import PropTypes from 'prop-types';

function PostImage({ src, caption }) {
    return (
        <img src={src} alt={caption} />
    )
}

PostImage.propTypes = {
    src: PropTypes.string.isRequired,
    src: PropTypes.string
}

export default PostImage

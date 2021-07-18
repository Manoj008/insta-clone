import React, { useEffect } from 'react'
import { useHistory } from 'react-router';

function NotFound() {
    const history = useHistory();
    useEffect(() => {
        document.title = 'Not Found!';
        setTimeout(() => {
            history.push('/')
        }, 2500)
    }, [])
    return (
        <div className="bg-gray-200">
            <div className="mx-auto max-w-screen=lg">
                <p className="text-center text-2xl">Requested page Not Found!</p>
                <p className="text-center text-2xl" > Redirecting to Homepage </p>
            </div>
        </div >
    )
}

export default NotFound

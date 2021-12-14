import React from 'react';
import Loading from '../Loader/loading.gif'

function Loader() {
    return (
        <div>
            <div className="text-center">
                <img src={Loading} alt="loading" />
            </div>
        </div>
    )
}

export default Loader

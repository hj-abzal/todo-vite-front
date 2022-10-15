import React from 'react';

const Loading = () => {
    return (
        <div>
            <img src='data:image/png;base64,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'/>
        </div>
    );
};

export default Loading;
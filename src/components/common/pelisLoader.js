import React from 'react'
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

const RotatingGallery = props => {
    return (
        <ContentLoader
            viewBox="0 0 1644 360"
            height={360}
            width={1644}
            speed={1}
            {...props}
        >
            <Rect x="448" y="30" rx="0" ry="0" width="750" height="300" />
            <Rect x="239" y="53" rx="0" ry="0" width="643" height="254" />
            <Rect x="30" y="76" rx="0" ry="0" width="527" height="208" />
            <Rect x="762" y="53" rx="0" ry="0" width="643" height="254" />
            <Rect x="1087" y="76" rx="0" ry="0" width="527" height="208" />
        </ContentLoader>
    )
}

export default RotatingGallery

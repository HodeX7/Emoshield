import React from 'react';

export default function Header({text}) {
    return (
        <h1 className="scroll-m-20 text-4xl font-extrabold lg:text-7xl ">
            {text}
        </h1>
    )
}

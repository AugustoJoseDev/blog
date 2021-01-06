import React from 'react'

export default function Field({ name, type, ...params }) {
    return (
        <>
            <label htmlFor={ `id${ name }` }>
                { `${ name }: ` }
            </label>
            <br />
            <input type={ type } name={ name } id={ `id${ name }` } { ...params } />
            <br />
        </>
    )
}
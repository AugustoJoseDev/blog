import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import Post from './Post'

export default function Blog() {
    const { author } = useParams()
    const [ user, setUser ] = useState(null)
    const [ posts, setPosts ] = useState(null)

    useEffect(async () => {
        const response = await api.get(`/user/${ author }`)
        const { user, posts } = response.data

        setUser(user)
        setPosts(posts)

    }, [ author ])

    return user && posts ? (
        <div className="blog">
            <h1>Blog do { user.fullName }</h1>
            <sub>@{ user.username }</sub>
            <div className="posts">
                { posts.map((post, i) => <Post key={ i } { ...post } />) }
            </div>
        </div>
    ) : (
            <p>Loading...</p>
        )
}
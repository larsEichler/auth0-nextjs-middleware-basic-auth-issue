'use client'

import { useUser } from "@auth0/nextjs-auth0"

export default function UserInfo() {
    const {user, isLoading} = useUser()

    if (isLoading) return <div>Loading...</div>

    return (
        <div>
            {user?.name}
        </div>
    )
}
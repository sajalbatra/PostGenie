"use client"
import { signIn, signOut,useSession } from "next-auth/react"

const Header = () => {
            const {data : session} =  useSession()
    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="text-xl font-bold">Postgenie</div>
            <div>
                {session ? (
                    <div className="flex items-center space-x-4">
                        <span>Welcome, {session.user?.name}</span>
                        <button
                            onClick={() => signOut()}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => signIn()}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </header>
    )
}

export default Header

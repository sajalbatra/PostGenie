"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"


const Header = () => {
    const { data: session } = useSession()
    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="text-xl font-bold">Postgenie
            </div>
            <Givefeedback/>
            <div>
                {session ? (
                    <div className="flex items-center space-x-4 text-xl">
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
                        Sign In-To Save Post
                    </button>

                )}
            </div>
            
        </header>
    )
}

export default Header


const Givefeedback = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger>Give Feedback</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Thank you for using our services</AlertDialogTitle>
                    <AlertDialogDescription>
                    <RadioGroup defaultValue="option-one">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-one" id="option-one" />
                                <Label htmlFor="option-one">1 star</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-two" id="option-two" />
                                <Label htmlFor="option-two">2 stars</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-three" id="option-three" />
                                <Label htmlFor="option-three">3 stars</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-four" id="option-four" />
                                <Label htmlFor="option-four">4 stars</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="option-five" id="option-five" />
                                <Label htmlFor="option-five">5 stars</Label>
                            </div>
                        </RadioGroup>

                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from "react";

interface Props
{
    children: React.ReactNode
    role: "user" | "assistant"
}

const Message: React.FC<Props> = ({ children, role }) =>
{

    return (
        <div className="w-full">
            <div className="flex items-center mb-1">
                <Avatar className="h-7 w-7 mr-2">
                    <AvatarImage src={
                        role == "assistant" ? 
                        "https://scontent-cph2-1.xx.fbcdn.net/v/t39.30808-6/327465130_726711092417365_8334114910654247301_n.png?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=JPLiRb_8kjEAX-6xxlw&_nc_ht=scontent-cph2-1.xx&oh=00_AfBHm-osYYheL2lA9b6uXCes5EiYkHYtqjMCY7j4dgjiWg&oe=65B8BC93" 
                        : 
                        "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"} />
                    <AvatarFallback />
                </Avatar>
                <p className="font-bold">
                    {role === "assistant" ? "Chefsassistenten" : "Du"}
                </p>
            </div>
            {children}
        </div>
    )
}

export default Message


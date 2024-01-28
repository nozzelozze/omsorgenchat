import { Input } from "@/components/ui/input";
import Watermark from "./Watermark";
import { Button } from "@/components/ui/button";
import { ChevronRight, PenLine } from "lucide-react";
import APIClient from "@/api/api";
import { useEffect, useRef, useState } from "react";
import
{
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Message from "./Message";
import ReactMarkdown from 'react-markdown';

const Chat = () =>
{

    const clear = async () =>
    {
        await APIClient.newThread()
        setMessages([])
        setUserInput("")
        setAssistantLoading(false)
    }

    const [messages, setMessages] = useState<{ role: "user" | "assistant", content: string }[]>([])

    const [userInput, setUserInput] = useState("")

    const [assistantLoading, setAssistantLoading] = useState<boolean>(false)

    const sendMessage = async () =>
    {
        if (userInput == "" || assistantLoading)
            return

        setAssistantLoading(true)

        setMessages(prev => [...prev, { content: userInput, role: "user" }])

        setUserInput("")

        await APIClient.message(userInput)
        await APIClient.runAssistant()

        APIClient.runStatus().then(messages =>
        {
            if (!messages)
                return
            let assistantMessage = messages.data[0]
            setMessages(prev => [...prev, { content: (assistantMessage.content[0] as any).text.value, role: "assistant" }])
            setAssistantLoading(false)
        }).catch(error =>
        {

        })

    }

    const bottomChatRef = useRef<HTMLDivElement>(null);


    useEffect(() =>
    {
        if (bottomChatRef.current)
        {
            bottomChatRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);


    return (
        <div className="container mx-auto p-4 h-screen flex flex-col max-w-max">

            <div className="fixed top-0 left-0 w-full bg-white sm:bg-transparent z-50 border-b-2 sm:border-b-0">
                <Button variant="outline" className="rounded-xl m-3" size="icon" onClick={clear}>
                    <PenLine className="h-4 w-4" />
                </Button>
            </div>

            {
                messages.length == 0 &&
                <Watermark />
            }


            <div className="flex flex-col justify-between -mx-10 items-center h-full mt-14 mb-20">
                {/* Chat Messages */}
                <div className=" max-w-screen-md w-screen flex flex-col space-y-8 px-3 scroll-smooth">
                    {messages.map((message, index) => (
                        <div ref={index === messages.length - 1 ? bottomChatRef : null} key={index}>
                            <Message role={message.role}>

                                {
                                    message.role == "assistant" ?
                                        <ReactMarkdown className={`markdown message-fade-in`}>
                                            {(message.content && message.content.indexOf('【') !== -1) ? message.content.substring(0, message.content.indexOf('【')) + '.' : message.content}
                                        </ReactMarkdown>
                                        :
                                        <div className={`whitespace-pre-wrap w-full`}>
                                            {message.content}
                                        </div>
                                }

                            </Message>
                        </div>
                    ))}
                    {
                        assistantLoading &&
                        <Message role="assistant" >
                            <div className="flex items-center w-full space-x-2 h-10">
                                <span className="loader"></span>
                                <p className="font-semibold text-zinc-500">Letar i dokument</p>
                            </div>
                        </Message>
                    }
                    <div className="h-20 w-20">
                    </div>
                </div>

                {/* Text Input Bar */}
                <div className="fixed bottom-0 border-0 p-4 flex justify-center w-full bg-white">
                    <div className="flex w-full items-center justify-center">
                        <div className="flex flex-col w-screen -mx-2 max-w-screen-md items-center">
                            <div className="flex-grow relative w-full">
                                <TooltipProvider delayDuration={50}>
                                    <div className="flex w-full items-center">
                                        <Input
                                            type="text"
                                            value={userInput}
                                            onChange={e => setUserInput(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && sendMessage()}
                                            placeholder="Skriv ditt meddelande..."
                                            className="w-full pl-4 pr-[calc(1rem+48px)]"
                                        />
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="absolute right-0 top-0 bottom-0 m-2 hover:bg-zinc-800 hover:text-white bg-zinc-800 text-white rounded-2xl border-none"
                                                    size="icon"
                                                    onClick={sendMessage}
                                                    disabled={userInput === "" || assistantLoading}
                                                >
                                                    <ChevronRight className="h-6 w-6" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Skicka ditt meddelande</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Chat;

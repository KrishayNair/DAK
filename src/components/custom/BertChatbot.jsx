import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchFromAPI } from "@/lib/api"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"


export default function BertChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { text: "Hi there! How can I help you today?", isBot: true }
    ])
    const [inputMessage, setInputMessage] = useState("")

    // Add ref for scroll management
    const messagesEndRef = useRef(null)

    // Add scroll to bottom function
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    // Add useEffect to scroll on new messages
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const router = useRouter()


    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return

        // Add user message
        setMessages(prev => [...prev, { text: inputMessage, isBot: false }])
        setInputMessage("") // Clear input

        try {
            const res = await fetchFromAPI(`philatelist/chatBotResponse/?query=${encodeURIComponent(inputMessage)}`);
            
            if (res.success) {
                if (res.data.model === "genai") {
                    setMessages(prev => [...prev, { text: res.data.response, isBot: true }]);
                } else if (res.data.model === "intent") {
                    setMessages(prev => [...prev, {
                        text: "I'll redirect you to the relevant page.",
                        isBot: true
                    }]);
                    if (["/shop", "/cart", "/pda"].includes(res.data.response)) {
                        router.push(res.data.response);
                    } else {
                        setMessages(prev => [...prev, {
                            text: "I'm sorry, I don't know how to help with that.",
                            isBot: true
                        }]);    
                    }
                }
            } else {
                setMessages(prev => [...prev, {
                    text: "I'm sorry, I encountered an error. Please try again.",
                    isBot: true
                }]);
            }
        } catch (error) {
            console.error("Chatbot error:", error);
            setMessages(prev => [...prev, {
                text: "I'm sorry, something went wrong. Please try again.",
                isBot: true
            }]);
        }

        // Simulate bot response (you can replace this with actual API call)
        // setTimeout(() => {
        //     setMessages(prev => [...prev, {
        //         text: "Thanks for your message! I'm a demo bot.",
        //         isBot: true
        //     }])
        // }, 1000)
    }

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg"
            >
                <MessageCircleIcon className="h-6 w-6" />
            </Button>

            {isOpen && (
                <div className="fixed bottom-4 right-4 z-50">
                    <div className="w-[400px] rounded-2xl bg-white shadow-lg">
                        <div className="flex flex-col h-[500px]">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h2 className="font-semibold">Chat with us</h2>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="rounded-full w-8 h-8"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <PanelTopCloseIcon className="h-4 w-4" />
                                    <span className="sr-only">Close</span>
                                </Button>
                            </div>
                            <div className="flex-1 p-4 overflow-y-auto scroll-smooth">
                                {messages.map((message, index) => (
                                    <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} mb-4`}>
                                        <div className={`max-w-[75%]`}>
                                            <div className={`rounded-lg p-4 text-sm break-words leading-6 ${
                                                message.isBot 
                                                ? 'bg-gray-100 dark:bg-gray-800' 
                                                : 'bg-blue-500 text-white'
                                            }`}>
                                                {message.text}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} /> {/* Add scroll anchor */}
                            </div>
                            <div className="border-t p-4">
                                <div className="grid grid-cols-12 gap-4">
                                    <Input 
                                        placeholder="Type a message..." 
                                        className="col-span-10"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSendMessage()
                                            }
                                        }}
                                    />
                                    <Button 
                                        className="col-span-2 h-10"
                                        onClick={handleSendMessage}
                                    >
                                        Send
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

function PanelTopCloseIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="m9 16 3-3 3 3" />
        </svg>
    )
}

function MessageCircleIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
    )
}
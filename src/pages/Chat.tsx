import { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { database } from '../services/firebase';

import styled from 'styled-components';

import { Header } from '../components/Header';
import { Message } from '../components/Message';

import sendIcon from '../assets/icons/send.svg';

type ChatPropsType = {
    className: string;
}


type MessageType = {
    content: string;
    user: {
        id: string;
        name: string;
        pic: string;
    };
    createdAt: string;
}


export function ChatComponent({ className }: ChatPropsType) {
    const history = useHistory();

    const { user, signInWithGoogle } = useAuth();

    async function sendMessage(message: string) {
        database.ref(`messages`).push({
            content: message,
            createdAt: new Date(),

            user: {
                id: user?.id,
                name: user?.name,
                pic: user?.pic
            }

        })
    }

    function handleSendMessage(e: FormEvent) {
        e.preventDefault()
        if (msg.trim() === '' || !user) {
            return;
        }

        sendMessage(msg)
        setMsg('')
    }

    const [msg, setMsg] = useState('');


    const [messages, setMessages] = useState<MessageType[]>([]);
    const parsedMessages = Object.entries(messages).map(([key, value]) => {
        return {
            id: key,
            content: value.content,
            userId: value.user.id,
            userName: value.user.name,
            userPic: value.user.pic,
            createdAt: value.createdAt
        }
    })

    useEffect(() => {
        database.ref(`messages`).on('value', (value) => {
            setMessages(value.val() || {})
        })
    }, [])

    return (
        <div className={className}>
            <Header />
            <main>
                <nav>
                    <button onClick={() => history.push('/')}>Ir para home</button>
                </nav>

                {user ? (
                    <>
                        <form action="" onSubmit={handleSendMessage}>
                            <div className="messages">
                                {parsedMessages.map(message => {
                                    return (
                                        <Message
                                            content={message.content}
                                            selfMessage={message.userId === user.id}
                                            pic={message.userPic}
                                            userName={message.userName}
                                            id={message.id}
                                        />
                                    )
                                })}
                            </div>
                            <div className="bottom">
                                <textarea value={msg} onChange={e => setMsg(e.target.value)} />
                                <button type="submit">
                                    <img src={sendIcon} alt="Ícone de enviar" />
                                </button>
                            </div>


                        </form>

                    </>
                ) : (
                    <div className="not-loged">
                        <h2>Você não está logado</h2>
                        <p>Faça o login para poder participar das conversas.</p>
                        <button onClick={signInWithGoogle}>Login</button>
                    </div>
                )}
            </main>

        </div>

    )
}

export const Chat = styled(ChatComponent)`
    height: 100vh;
    display:flex;
    flex-flow: column nowrap;
    background:#0f0f0f;

    main{
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        flex:1;

        nav{
            display:flex;
            align-items: center;

            button{
                border:none;
                outline:none;

                font-size: 13pt;
                border-radius: 5px;
                cursor:pointer;
            }
        }

        form{
            height:90%;
            width: 100%;
            max-width: 600px;
            display:flex;
            flex-flow: column nowrap;
            align-items:center;
            gap:5px;


            .messages{
                overflow-y: auto;
                height:80%;
                width: 100%;
                display:flex;
                flex-flow: column nowrap;

                &::-webkit-scrollbar{
                    width: 3px;
                }
                &::-webkit-scrollbar-thumb{
                    border-radius: 2px;
                    background:#ff0077;
                }
            }

            .bottom{
                display:flex;
                flex-flow: row nowrap;
                width: 100%;
                align-items: center;

                textarea{
                    flex:1;
                    border-radius: 8px;
                    resize:none;
                    outline:none;
                    height: 50px;
                    transition: all .2s;
                    font-size: 13pt;

                    &:focus{
                        box-shadow: inset 0px 0px 10px rgba(10, 10, 10, 0.7); 
                    }
                }

                button{
                    border:none;
                    padding: 5px;
                    border-radius: 4px;
                    align-self: flex-end;
                    font-size: 15pt;
                    cursor:pointer;
                    width:60px;
                    height:60px;
                    background-color:rgba(0, 0, 0, 0);
                    border-radius: 50%;
                    transition: all .2s;


                    &:hover{
                        background-color:rgba(0, 0, 0, .5);
                    }

                    img{
                        width:100%;
                        height:auto;
                    }
                }
            }
        }



        .not-loged{
            background-color:#ffffff;
            margin: 5px;
            border-radius: 8px;
            padding: 5px;
            display:flex;
            flex-flow: column nowrap;
            align-items: center;
            color:#1d1d1d;

            button{
                background: #d80f0f;
                color:white;
                border:none;
                padding: 5px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 13pt;
            }
        }
    }
`
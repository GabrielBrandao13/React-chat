import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { database } from '../services/firebase';

export function Chat() {
    const history = useHistory();

    const { user } = useAuth();

    async function sendMessage(message: string) {
        database.ref(`messages`).push({
            content: message,
            userId: user?.id,
            userName: user?.name
        })
    }

    function handleSendMessage() {
        sendMessage(msg)
        setMsg('')
    }

    const [msg, setMsg] = useState('');


    const [messages, setMessages] = useState([]);

    useEffect(() => {
        database.ref(`messages`).on('value', (value) => {
            setMessages(value.val())
        })
    }, [])

    return (
        <div>
            <h3>Chat</h3>
            <button onClick={() => history.push('/')}>Ir para home</button>
            <input type="text" value={msg} onChange={e => setMsg(e.target.value)} />
            <button onClick={handleSendMessage}>Enviar mensagem</button>

            {JSON.stringify(messages)}
        </div>
    )
}
import { useHistory } from "react-router-dom"

export function Chat() {
    const history = useHistory()

    return (
        <div>
            <h3>Chat</h3>
            <button onClick={() => history.push('/')}>Ir para home</button>
        </div>
    )
}
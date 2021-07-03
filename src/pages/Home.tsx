import { useHistory } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export function Home() {
    const history = useHistory()
    const { user, signInWithGoogle } = useAuth()

    async function handleOpenChat() {
        if (!user) {
            return await signInWithGoogle();
        }

        history.push('/chat');
    }

    async function handleLogin() {
        await signInWithGoogle()
    }
    return (
        <div>
            <h3>Home</h3>
            <button onClick={handleOpenChat}>Ir para tela chat</button>
            <button onClick={handleLogin}>Logar</button>

            <h6>Nome de usuário: {user?.name}</h6>
            <h6>Id de usuário: {user?.id}</h6>
            <img src={user?.pic} alt="Foto do usuário" />
        </div>
    )
}
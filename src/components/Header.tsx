import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';

import loginIcon from '../assets/icons/login.svg';

type HeaderPropsType = {
    className?: string;
}

function HeaderComponent({ className }: HeaderPropsType) {
    const { user, signInWithGoogle } = useAuth()

    async function handleLogin() {
        await signInWithGoogle()
    }

    return (
        <header className={className}>
            <span>React Chat</span>
            <div className="user">
                <span>{user?.name}</span>
                {user ? (
                    <img src={user?.pic} alt="Foto de perfil Google" />
                ) : ''}
                <button onClick={handleLogin}>
                    <img src={loginIcon} alt="Icone de login" />
                    <p>
                        {!user ? 'Fazer login com conta Google' : 'Trocar de conta'}
                    </p>
                </button>
            </div>

        </header>
    )

}

export const Header = styled(HeaderComponent)`
    display:flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    padding: 0px 8px;
    background-color:#9e052e;
    color:white;

    .user{
        display:flex;
        align-items:center;
        gap:5px;

        img{
            width:40px;
            height:auto;
            border-radius: 50%50%;
        }

        button{
            border:none;
            outline:none;
            padding: 1px 5px;
            border-radius: 8px;
            font-size: 12pt;
            background-color:#d32424;
            color:white;
            cursor:pointer;
            display: flex;
            align-items: center;
            gap:4px;
            transition: all .2s;

            &:hover{
                filter: brightness(.85);
            }

            img{
                height: 100%;
                width: auto;
            }
        }
    }
    > span{
        font-size: 20pt;
    }
`
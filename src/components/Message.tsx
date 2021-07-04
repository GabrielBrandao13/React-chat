import styled from 'styled-components';
import { database } from '../services/firebase';


import deleteIcon from '../assets/icons/delete.svg';

type MessagePropsType = {
    className?: string;
    content: string;
    selfMessage?: boolean;
    pic: string;
    userName: string;
    id: string;
}

function MessageComponent({ className, content, pic, userName, id, selfMessage }: MessagePropsType) {

    async function errase() {
        await database.ref(`messages/${id}`).remove()
    }

    return (
        <div className={className}>

            <div className="user">
                <img src={pic} alt="Foto de perfil do usuário" />
                <p>{userName}</p>
            </div>
            <p>
                {content}
            </p>
            {selfMessage && (
                <button className="delete" onClick={errase}>
                    <img src={deleteIcon} alt="Icone de deletar" />
                </button>
            )}
        </div>
    )
}

export const Message = styled(MessageComponent)`
    width: 70%;
    background-color:${props => props.selfMessage ? '#a210e0' : '#fff'};
    align-self: ${props => props.selfMessage ? 'flex-end' : 'flex-start'};
    margin: 5px;
    border-radius: 8px;
    padding: 5px;
    display:flex;
    gap:4px;

    .user{

        img{
            border-radius: 50%;
            height: 50px;
            width:auto;
        }
        p{
            margin: 2px;
        }
    }

    > p{
        flex:1;
    }

    button.delete{
        padding: 0;
        margin: 0;
        width: 30px;
        height:30px;

        img{
            width: 100%;
            height: auto;
        }
    }


`
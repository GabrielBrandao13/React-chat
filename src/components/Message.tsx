import styled from 'styled-components';
import { database } from '../services/firebase';
import { useState } from 'react';

import deleteIcon from '../assets/icons/delete.svg';
import editIcon from '../assets/icons/edit.svg';
import saveIcon from '../assets/icons/save.svg';


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
    async function edit() {
        await database.ref(`messages/${id}`).update({
            content: newContent
        })
        setEditing(false)
    }
    const [editing, setEditing] = useState(false);

    const [newContent, setNewContent] = useState(content);

    return (
        <div className={className}>

            <div className="user">
                <img src={pic} alt="Foto de perfil do usuário" />
                <p>{userName}</p>
            </div>

            {editing ? (
                <textarea value={newContent} onChange={e => setNewContent(e.target.value)}></textarea>
            ) : (
                <p>
                    {content}
                </p>
            )}

            {selfMessage && (
                <>
                    <button className="action" onClick={errase}>
                        <img src={deleteIcon} alt="Ícone de deletar" />
                    </button>
                    {editing ? (
                        <>
                            <button onClick={edit} className="action">
                                <img src={saveIcon} alt="Ícone de salvar" />
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="action" onClick={() => setEditing(!editing)}>
                                <img src={editIcon} alt="Ícone de editar" />
                            </button>
                        </>
                    )}

                </>
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

    > p, > textarea{
        flex:1;
        font-size: 13pt;
    }
    > textarea{
        border-radius: 8px;
        resize: vertical;
    }

    > button.action{
        height: 30px;
        width: 30px;
        border:none;
        outline:none;
        border-radius: 50%;
        align-self: flex-end;
        cursor:pointer;

        img{
            width: 100%;
            height: auto;
        }
    }

`
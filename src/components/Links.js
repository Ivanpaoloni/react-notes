import React, { useEffect, useState } from "react"; //cuando carga el componente hace una peticion a firebase
import LinkForm from "./LinkForm";
import {toast} from 'react-toastify';

import {db} from '../firebase'
import { async } from "@firebase/util";


const Links = () => {

    const [notes, setNotes] = useState([]);
    const [currentId, setCurrentId] = useState('');

    //funcion para agregar a la DataBase asincronamente.
    const addOrEdit = async (linkObject) => {
        await db.collection('Notas').doc().set(linkObject);
        toast('Nueva nota creada.', {
            type: 'success',
            autoClose: 2000,
        })
    };
    //funcion para eliminar.
    const onDeleteNote = async id => {
        if (window.confirm('Estas seguro de eliminar esta nota?')) {
            await db.collection('Notas').doc(id).delete();
            toast('Nota eliminada.', {
                type: 'error',
                autoClose: 2000,
            })
        }  
        
    };

    //querysnapshot es la respuesta del sv de firebase.
    //onSnapshot refresca automaticamente los datos ante la carga de uno nuevo.
    const getNotes = () => {
       const querySnapshot = db.collection('Notas').onSnapshot((querySnapshot) => {
           const docs = [];
        querySnapshot.forEach(doc => {
            docs.push({...doc.data(), id:doc.id});
        });
        setNotes(docs);
       });

    }
    useEffect(() => {
        getNotes();
    }, []);

    return(
        <div>
            <div className="col-md-8 p-2">
                <LinkForm {...{addOrEdit, currentId, notes}}/>
            </div>
            <div className="col-md-8 p-2">
                {notes.map(nota => (
                    <div className="card mb-1">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{nota.name}</h4>
                                <div>
                                    <i className="material-icons" onClick={() => onDeleteNote(nota.id)}>close</i>

                                    <i className="material-icons" onClick={() => setCurrentId(nota.id)}> create </i>
                                </div>
                                
                            </div>
                            <p>{nota.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Links;
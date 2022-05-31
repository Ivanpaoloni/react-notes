import { async } from "@firebase/util";
import React, {useState, useEffect} from "react";
import {toast} from 'react-toastify';
import { db } from "../firebase";

const LinkForm = (props) => {
    //constante con los valores a pasar a la db
    const initialStateValues = {
        name: "",
        description: ""
    };
    //paso de valores ingresados a la const de valores.
    const [values, setValues] = useState(initialStateValues);

    //funcion que guarda los valores (boton).
    const handleImputChange = (e) => {
        const {name, value}= e.target;
        setValues({...values, [name]:value})

    };
    //AutoRefresh off.
    const handleSubmit = (e) => {
        e.preventDefault();
        props.addOrEdit(values);
        setValues({...initialStateValues})
    };

    const getNotaById = async (id) => {
        const doc = await db.collection('Notas').doc(id).get();
        console.log(doc.data());
    }

    useEffect(() => {
        console.log(props.currentId);
        if (props.currentId === '') {
            setValues({...initialStateValues})
        } else {
            getNotaById(props.currentId);
        }
    }, [props.currentId]);

    return (
        //formulario de ingreso de datos.
        //value=value.name == limpiar datos.
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                <i className="material-icons text-dark">create</i>
                </div>
                <input type="text" className="form-control" name="name" placeholder="Titulo" onChange={handleImputChange} value={values.name}/>
            </div>
            <br></br>
            <div className="form-group">
                <textarea name="description" rows="3" className="form-control" placeholder="Tome una nota..." onChange={handleImputChange} value={values.description}>
                </textarea>
            </div>
            <br></br>
            <button className="btn btn-primary btn-block">
                Guardar
            </button>
        </form>
    );
};

export default LinkForm;
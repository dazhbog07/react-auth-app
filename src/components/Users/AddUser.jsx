import React, {useState, useRef} from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from './AddUser.module.css'
import Wrapper from './../Helpers/Wrapper';


const AddUser = (props) => {

    const nameInputRef = useRef()
    const nameAgeRef = useRef()
    
    const [error, setError] = useState()


    const addUserHandler = (event) => {

        event.preventDefault()

        const enteredName = nameInputRef.current.value
        const enteredAge = nameAgeRef.current.value

        if(enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name or age (non-empty values).'
            })
            return
        }
        if(+enteredAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (> 0)'
            })
            return
        }
        props.onAddUser(enteredName, enteredAge)
        
        nameInputRef.current.value = ''
        nameAgeRef.current.value = ''

    }


    const errorHandler = () => {
        setError(null)
    }

    return(
    <Wrapper>
       {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor="userName">UserName</label>
                <input

                    id="userName"
                    type="text"
                    ref={nameInputRef}/>

                <label htmlFor="age">Age (Years)</label>
                <input

                    id="age"
                    type="number"
                    ref={nameAgeRef}/>

            <Button type="submit">Add User</Button>
            </form>
        </Card>
    </Wrapper>
    )

}

export default AddUser
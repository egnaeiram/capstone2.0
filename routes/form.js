import React from "react";
import useForm from "react-hook-form";

export default function Form() {
    const { user_id, username, bike_id, lostOrDamage, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Report a Loss or Damage Bike</h1>
            <p>Please fill out the form below.</p>
                    <input type="text" placeholder="User ID" name="user_id" ref={users({required: true})} />
                    <input type="text" placeholder="Username" name="username" ref={users({required: true})}/>
                    <input type="text" placeholder="Email" name="email" ref={users({required: true})}/>
                    <input type="text" placeholder="Bike ID" name="bike_id" ref={bikes({required: true})}/>
                    <input type="checkbox" placeholder="Lost" name="lost"/>
                    <input type="checkbox" placeholder="Damaged" name="damaged"/>
                    <input type="text" placeholder="Explanation" name="explanation"/>
                    <textarea name="explanation" id="explanation" cols="30" rows="10"></textarea>
                <input type="submit">Submit</input>
            </form>
    );
}



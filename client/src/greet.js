import React from "react";
import { UserContext } from "./context";

export default function Greet() {
    const { session } = React.useContext(UserContext);

    if (session.auth === true) {
        return (
        <span id='greet'>Welcome {session.name}!</span>
    )} else {
        return (
            <span></span>
        )}
}
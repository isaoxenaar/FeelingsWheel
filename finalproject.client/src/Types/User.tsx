import Emotion from "./Emotion";

type User = {
    id?:string;
    name?:string;
    emotion?:Emotion[];
}

export default User;
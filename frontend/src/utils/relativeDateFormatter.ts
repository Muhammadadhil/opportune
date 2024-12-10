import {formatDistanceToNow, } from 'date-fns';

export const getRelativeTime =(date:string)=>{
    try{
        return `${formatDistanceToNow(new Date(date))} ago`;
    }catch(errror){
        console.log(errror);
        return 'Invalid date';
    }
}
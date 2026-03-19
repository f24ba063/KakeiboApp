import { useState, createContext } from 'react';

export const UserContext = createContext({
    userName: "",
    setUserName: () => { }
});
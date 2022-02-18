import {EXPIRY_TIME} from 'constants/storageConstants'
import { USER_STORAGE_SIZE } from 'constants/storageConstants';
const localStorageMap = new Map<string, number>();

export const setStorage = (key: string, value: any) => {
  const now = getCurrentDate();
  if(allStorage().length >= USER_STORAGE_SIZE+1 && key!=='posts'){
    const  keyDelete =  localStorageMap.keys().next().value;
    localStorageMap.delete(keyDelete);
    deleteStorage(keyDelete);
     }
     else if (key === 'posts'){
     localStorageMap.set(key,1);
     }

     if(key!==undefined){
     const insertPair = {
      value: value,
      expiry: now.getTime() + EXPIRY_TIME,   
   }
   localStorage.setItem(key, JSON.stringify(insertPair));
  }
}

export const getStorage = (key: string) => {
  const isItem = localStorage.getItem(key);
  if (!isItem) {
      return null;
  };
  const localItems = JSON.parse(isItem);
  const now = getCurrentDate();
  if (now.getTime() > localItems.expiry) {
      localStorage.removeItem(key)
      localStorageMap.delete(key);
      return null;
  }
  else if(key!=='posts'){
    localStorageMap.delete(key);
    localStorageMap.set(key,1);
  }
  return localItems.value;
}

export const deleteStorage = (key: string) => {
  localStorage.removeItem(key);
}


export const allStorage = ()=> {


   const keys = Object.keys(localStorage);

  return keys;
}


const getCurrentDate = ()=>{
 return new Date();
}

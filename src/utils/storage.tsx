import {EXPIRY_TIME} from 'constants/storageConstants'

export const setStorage = (key: string, value: any) => {
  const now = getCurrentDate();

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
      return null
  };
  const localItems = JSON.parse(isItem);
  const now = getCurrentDate();
  if (now.getTime() > localItems.expiry) {
      localStorage.removeItem(key)
      return null;
  }
  return localItems.value;
}

export const deleteStorage = (key: string) => {
  console.log(key);
  localStorage.removeItem(key);
}


export const allStorage = ()=> {


   const keys = Object.keys(localStorage);

  return keys;
}


const getCurrentDate = ()=>{
 return new Date();
}

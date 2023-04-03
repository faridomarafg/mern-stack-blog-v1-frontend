
const imageToBase64 =(file)=> {
    //initial file-reader
    const reader = new FileReader();
    reader.readAsDataURL(file);

    //check file is converted? for that we can use promise
    const data = new Promise((resolve, reject)=>{
        //if file converted
        reader.onload = ()=> resolve(reader.result);
     
        //if file does not converted
        reader.onerror = (err)=> reject(err)
    })

  return data
}

export default imageToBase64
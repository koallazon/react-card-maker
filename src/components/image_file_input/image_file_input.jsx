import React, { useRef } from 'react';
import styles from './image_file_input.module.css'

const ImageFileInput = ({ imageUploader, name, onFileChange }) => {
    const inputRef = useRef();

    const onButtonClick = (e) => {
        e.preventDefault()
        inputRef.current.click()   
    }

    const onChange = async (e) => {
        console.log(e.target.files[0])
        const uploaded = await imageUploader.upload(e.target.files[0])
        onFileChange({
            name: uploaded.original_filename,
            url: uploaded.url
        })
    }

    return <div className={styles.container}>
        <input 
          ref={inputRef} 
          className={styles.input} 
          id="fileInput" 
          type="file" 
          name="file" 
          accpet="image/*" 
          onChange={onChange} 
        />
        <button className={styles.button} onClick={onButtonClick}>{ name || 'NO FILE' }</button>
    </div>
};

export default ImageFileInput;
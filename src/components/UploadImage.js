import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import 'react-image-crop/lib/ReactCrop.scss';
import ReactCrop from 'react-image-crop';

function UploadImage(props) {
  const [image, setImage] = useState()
  const [croppedImageUrl, setCroppedImageUrl] = useState()
  const [hasError, setHasError] = useState(false)
  const [imgToCrop, setImgToCrop]             = useState()
  const [crop, setCrop]                       = useState({aspect: 1, unit: 'px', width: 50, height: 50})
  const [hasCropModal, setCropModal]          = useState(false)
  const [imgRef, setImageRef]                 = useState()

  function saveModal() {
    makeClientCrop(crop);
    setCropModal(false);
  }

  const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

  const onCropChange = (crop, percentCrop) => setCrop(crop);
  const onImageLoaded = (image) => setImageRef(image);

  const makeClientCrop = async (crop) => {
    if (imgRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imgRef,
        crop,
        'newphoto.jpeg'
      );
      setCroppedImageUrl(croppedImageUrl);
      console.log(croppedImageUrl)
      props.onSave(croppedImageUrl);
    }
  }

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return canvas.toDataURL('image/png;base64');
  }

  const onSelectFile = async ({ target: { files } }) => {
    setCrop({ aspect: 1, unit: 'px', width: 50, height: 50 })
    if (files && files.length > 0) {
      const file = files[0]
      if (file.size / 1024 / 1024 > 2) {
        setHasError(true)
      } else {
        const newImage64 = await getBase64(file)
        setHasError(false)
        setImgToCrop(newImage64)
        setCropModal(true)
      }
    }
  }

  return <main>
    <section>
      <div className="col-12">        
        <input id="uploadPhoto" type="file" accept="image/*" style={{display:"none"}}  onChange={e => onSelectFile(e)}/>
        <label htmlFor="uploadPhoto" className="btn btn btn-light mt-2">
            Upload picture
        </label>
        {hasError && <small className="form-text text-danger mb-3">File size exceeds 2 MB. Please, try again!</small>}
      </div>
    </section>

    {imgToCrop && <section>
        <Modal isOpen={hasCropModal}>

          <ModalHeader>
            Image crop
          </ModalHeader>

          <ModalBody className={`row`}>           
            <div className="d-flex justify-content-center flex-row w-100">
              <ReactCrop 
                    src={imgToCrop} 
                    crop={crop} 
                    onImageLoaded={onImageLoaded}
                    ruleOfThirds
                    onChange={onCropChange}
                />
            </div>
          </ModalBody>

          <ModalFooter>
            <button type="button" onClick={() => setCropModal(false)} className="btn btn-danger">Cancel</button>
            <button type="button" onClick={() => saveModal()} className="btn btn-success">Save</button>
          </ModalFooter>

        </Modal>
      </section>
      }
  </main>



}

export default UploadImage;

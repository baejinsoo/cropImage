import React, { useState, useCallback } from "react";
import Webcam from "react-webcam";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import "./styles.css";

const videoConstraints = {
  width: 380,
  height: 280,
  facingMode: "user",
};

const capImage = "./logo192.png";

const Camera = () => {
  const webcamRef: any = React.useRef(null);
  // const [capImage, setCapImage] = useState(undefined);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState<any | null>(null);
  const [rotation, setRotation] = useState(0);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // const capture = React.useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   setCapImage(imageSrc);
  //   console.log(imageSrc);
  // }, [webcamRef]);

  const useCroppedImage = useCallback(async () => {
    try {
      const croppedImage: any = await getCroppedImg(
        capImage,
        croppedAreaPixels,
        rotation
      );
      console.log("done", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.log(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const reCapture = useCallback(() => {
    // setCapImage(undefined);
    setCrop({ x: 0, y: 0 });
    setCroppedImage(undefined);
    setZoom(1);
  }, []);

  const download = () => {
    const href = croppedImage;
    const link = document.createElement("a");
    link.href = href;
    link.download = "file name" + ".jpeg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {!capImage ? (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        </div>
      ) : (
        // <img src={image} alt="test-ilustartion" />
        <>
          <div className="App">
            <div className="crop-container">
              <Cropper
                image={capImage}
                crop={crop}
                zoom={zoom}
                aspect={3 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                classes={{
                  cropAreaClassName: "guide-Line",
                }}
              />
            </div>
            <div className="controls">
              <button onClick={useCroppedImage}>사진 사용</button>
              <button onClick={reCapture}>다시 촬영</button>
              <button onClick={download}>사진 저장</button>
            </div>
            <div>
              <img src={croppedImage} />
            </div>
          </div>
        </>
      )}
      <br />
      {/* {!capImage ?
      <button onClick={() => (!capImage ? capture() : setCapImage(undefined))}>
        사진 촬영
      </button>
      :
      <>
      </>
    } */}
    </div>
  );
};

export default Camera;

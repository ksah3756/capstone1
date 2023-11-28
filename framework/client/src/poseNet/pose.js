import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import {drawKeypoints, drawSkeleton, drawWrongKeypoint} from "./utilities";
import {postData} from "../api/poses";

export function PoseNet() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    //  Load posenet
    const runPosenet = async () => {
    const net = await posenet.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.8,
      });
      //
      setInterval(() => {
        detect(net);
      }, 1000); // 1000ms마다 자세 추정
    };
  
    const detect = async (net) => {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;
  
        // Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;
  
        // Make Detections
        const pose = await net.estimateSinglePose(video);
        console.log(pose);
  
        const poseData = calculatePoseData(pose["keypoints"], videoWidth, videoHeight, canvasRef); 
        sendDataToDB(poseData);
        //drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
      }
    };
  
    // keypoint를 표시하고 keypoint들을 잇는 선을 그린다.
    const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
      const ctx = canvas.current.getContext("2d");
      canvas.current.width = videoWidth;
      canvas.current.height = videoHeight;
  
      drawKeypoints(pose["keypoints"], 0.5, ctx);
      drawSkeleton(pose["keypoints"], 0.5, ctx);
    };

    const calculatePoseData = (keypoints, videoWidth, videoHeight, canvas) => {
      const ctx = canvas.current.getContext("2d");
      canvas.current.width = videoWidth;
      canvas.current.height = videoHeight;

      // 사용자의 오른쪽을 촬영중이라면 rightsideIndex == 1
      var rightSideIndex = 0;
      if (keypoints[3].score < keypoints[4].score){
        rightSideIndex = 1;
      }

      // 각 keypoint 값 불러오기
      const keypoint_ear = keypoints[3 + rightSideIndex];
      const keypoint_shoulder = keypoints[5 + rightSideIndex];
      //const keypoint_elbow = keypoints[7 + rightSideIndex];
      //const keypoint_wrist = keypoints[9 + rightSideIndex];
      const keypoint_hip = keypoints[11 + rightSideIndex];
      const keypoint_knee = keypoints[13 + rightSideIndex];
      const keypoint_ankle = keypoints[15 + rightSideIndex];

      var poseScore = 5;
      var neck_flag = true;
      var hip_flag = true;
      //var elbow_flag = true;
      var knee_flag = true;

      // neck angle calculation
      var angle_neck = calculate_angle(keypoint_ear.position, keypoint_shoulder.position, keypoint_hip.position);
      angle_neck = 180 - angle_neck;
      if (angle_neck < 0 || angle_neck > 15){
        neck_flag = false;
        poseScore -= 1;
        const newX = (keypoint_ear.position.x + keypoint_shoulder.position.x) / 2;
        const newY = (keypoint_ear.position.y + keypoint_shoulder.position.y) / 2;
        drawWrongKeypoint({y: newY, x: newX}, ctx);
        console.log("angle_neck " + angle_neck);
      }

      // Elbow angle
      /*var angle_elbow = calculate_angle(keypoint_shoulder.position, keypoint_elbow.position, keypoint_wrist.position);
      if (angle_elbow < 90 || angle_elbow > 120){
        elbow_flag = false;
        poseScore -= 1;
        drawWrongKeypoint(keypoint_elbow.position, ctx);
        console.log("angle_elbow: " + angle_elbow);
      }*/

      // Hip angle calculation
      var angle_hip = calculate_angle(keypoint_shoulder.position, keypoint_hip.position, keypoint_knee.position);
      if (angle_hip < 90 || angle_hip > 120){
        hip_flag = false;
        poseScore -= 1;
        const newX = (keypoint_shoulder.position.x + keypoint_hip.position.x) / 2;
        const newY = (keypoint_shoulder.position.y + keypoint_hip.position.y) / 2;
        drawWrongKeypoint({y: newY, x: newX}, ctx);
        console.log("angle_hip: " + angle_hip);
      }

      // knee angle calculation
      var angle_knee = calculate_angle(keypoint_hip.position, keypoint_knee.position, keypoint_ankle.position);
      angle_knee = 180 - angle_knee;
      if (angle_knee < 90 || angle_knee > 130){
        knee_flag = false;
        poseScore -= 1;
        drawWrongKeypoint(keypoint_knee.position, ctx);
        console.log("angle_knee: " + angle_knee);
      }

      console.log("Pose Score: " + poseScore);

      const poseData = {neck: neck_flag, hip: hip_flag, knee: knee_flag};

      return poseData;
    };

    // 세 점을 이용해서 각도 계산. 각도는 B를 중심으로 계산
    const calculate_angle =  (A, B, C) => {
      var rad = Math.atan2(C["y"] - B["y"], C["x"] - B["x"]) - Math.atan2(B["y"] - A["y"], B["x"] - A["x"]);
      if (rad < 0){
        rad += Math.PI;
      }
      var deg = rad * (180 / Math.PI);

      return deg;
    };

    // DB에 데이터 전송하는 api 호출
    const sendDataToDB = async (poseData) => {
      await postData(poseData);
    };

    runPosenet();

    // webcamRef, canvasRef를 입력으로 받아서 처리해도 되고, poseNet 함수  내에서 자체적으로 생성해서 처리해도 됨
    return {webcamRef, canvasRef};
    // 화면에 표시하는 부분. 디자인에 맞게 수정 필요
    /*return (
      <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
    );*/
}
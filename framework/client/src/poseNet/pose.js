import React, { useRef } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import {drawKeypoints, drawSkeleton} from "./utilities";

export function poseNet(webcamRef, canvasRef) {
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
  
        drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
        calculateKeypoints(pose["keypoints"]); 
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

    const calculateKeypoints = (keypoints) => {
      // 사용자의 오른쪽을 촬영중이라면 rightsideIndex == 1
      var rightSideIndex = 0;
      if (keypoints[3].score < keypoints[4].score){
        rightSideIndex = 1;
      }

      // 각 keypoint 값 불러오기
      const keypoint_ear = keypoints[3 + rightSideIndex];
      const keypoint_shoulder = keypoints[5 + rightSideIndex];
      const keypoint_elbow = keypoints[7 + rightSideIndex];
      const keypoint_wrist = keypoints[9 + rightSideIndex];
      const keypoint_hip = keypoints[11 + rightSideIndex];
      const keypoint_knee = keypoints[13 + rightSideIndex];
      const keypoint_ankle = keypoints[15 + rightSideIndex];

      var wrong_part = [];
      var poseScore = 1;

      // knee angle calculation
      var angle_knee = calculate_angle(keypoint_hip.position, keypoint_knee.position, keypoint_ankle.position);
      angle_knee = 180 - angle_knee;
      //console.log("angle_knee: " + angle_knee);
      if (angle_knee >= 90 && angle_knee <= 130){
        wrong_part.push("knee");
        poseScore += 1;
      }

      // Hip angle calculation
      var angle_hip = calculate_angle(keypoint_shoulder.position, keypoint_hip.position, keypoint_knee.position);
      //console.log("angle_hip: " + angle_hip);
      if (angle_hip >= 90 && angle_hip <= 120){
        wrong_part.push("hip");
        poseScore += 1;
      }

      // neck angle calculation
      var angle_neck = calculate_angle(keypoint_ear.position, keypoint_shoulder.position, keypoint_hip.position);
      angle_neck = 180 - angle_neck;
      //console.log("angle_neck " + angle_neck);
      if (angle_neck >= 0 && angle_neck <= 15){
        wrong_part.push("neck");
        poseScore += 1;
      }

      // Elbow angle
      var angle_elbow = calculate_angle(keypoint_shoulder.position, keypoint_elbow.position, keypoint_wrist.position);
      //console.log("angle_elbow: " + angle_elbow);
      if (angle_elbow >= 90 && angle_elbow <= 120){
        wrong_part.push("elbow");
        poseScore += 1;
      }
      //console.log("Pose Score: " + poseScore);

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

    runPosenet();
}
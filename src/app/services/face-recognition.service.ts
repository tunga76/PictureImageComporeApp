// src/app/services/face-recognition.service.ts
import { Injectable } from '@angular/core';
import * as faceapi from 'face-api.js';

@Injectable({
  providedIn: 'root'
})
export class FaceRecognitionService {
  private MODEL_URL = '/assets/models';

  async loadModels(): Promise<void> {
    await Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(this.MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(this.MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(this.MODEL_URL)
    ]);
  }

  async getDescriptor(base64: string): Promise<Float32Array> {
    // const image = await this.base64ToImage(base64);
    const image = await this.loadImageFromUrl(base64);
    const detection = await faceapi.detectSingleFace(image)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) throw new Error('Yüz algılanamadı');
    return detection.descriptor;
  }

  isSameFace(d1: Float32Array, d2: Float32Array, threshold = 0.6): boolean {
    const distance = this.euclideanDistance(d1, d2);
    return distance < threshold;
  }

  private euclideanDistance(d1: Float32Array, d2: Float32Array): number {
    return Math.sqrt(d1.reduce((sum, val, i) => sum + (val - d2[i]) ** 2, 0));
  }

  async getDescriptorFromUrl(url: string): Promise<Float32Array> {
    const img = await this.loadImageFromUrl(url);
    const detection = await faceapi.detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) throw new Error('Yüz algılanamadı');
    return detection.descriptor;
  }


  private loadImageFromUrl(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // CORS problemi varsa
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }


  private base64ToImage(base64: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }
}

import { ChangeDetectorRef, Component, DestroyRef, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientService } from '../../services/http-client-service';
import { CommonModule } from '@angular/common';

import * as faceapi from 'face-api.js';

async function loadModels(): Promise<void> {
  const MODEL_URL = '/assets/models';
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
  ]);
}

function base64ToImage(base64: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

async function getDescriptor(base64: string): Promise<Float32Array> {
  const img = await base64ToImage(base64);
  const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
  if (!detection) throw new Error('Yüz algılanamadı');
  return detection.descriptor;
}

function euclideanDistance(d1: Float32Array, d2: Float32Array): number {
  return Math.sqrt(d1.reduce((sum, val, i) => sum + (val - d2[i]) ** 2, 0));
}

function isSameFace(d1: Float32Array, d2: Float32Array): boolean {
  return euclideanDistance(d1, d2) < 0.6;
}


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  onReset() {
    this.frm.reset();
  }
  formBuilder = inject(FormBuilder);
  httpClient = inject(HttpClientService)
  results:any[] = [];

  @ViewChild('searchInput', {static: true}) searhInput! : ElementRef 

  // myFormGroupDirective = inject(MyFormGroupDirective);
  frm!: FormGroup;

    constructor(private cdr: ChangeDetectorRef) {

  }


  onSubmit(value: any) {
    console.log(value);
  }



  ngOnInit() {


  }







    onChanged() {
    // this.frm?.get('name')?.setValue('hikmettung');
    // const observable = new Observable(subscriber => {
    //   subscriber.next('Hikmet Tunga');
    //   subscriber.next('Başlama');
    //   subscriber.complete();
    // });
    // observable.subscribe(value => console.log(`Değer : ${value}`))

  }
}

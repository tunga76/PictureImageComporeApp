import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FaceRecognitionService } from '../../services/face-recognition.service';

@Component({
  selector: 'app-facecompare-companent',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './face-compare.component.html',
  styleUrls: ['./face-compare.component.scss']
})
export class FaceCompareComponent {
  form: FormGroup;
  result = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private faceService: FaceRecognitionService
  ) {
    this.form = this.fb.group({
      urlA: [''],
      urlB: ['']
    });
  }

  async compareFaces() {
    this.result = '';
    this.isLoading = true;

    try {
      await this.faceService.loadModels();

      const urlA = this.form.get('urlA')?.value;
      const urlB = this.form.get('urlB')?.value;

      const [descA, descB] = await Promise.all([
        this.faceService.getDescriptorFromUrl(urlA),
        this.faceService.getDescriptorFromUrl(urlB)
      ]);

      const isSame = this.faceService.isSameFace(descA, descB);
      this.result = isSame ? '✔️ Aynı kişi gibi görünüyor' : '❌ Farklı kişiler';
console.log('Karşılaştırma Durumu =>', this.result)
    } catch (err: any) {
      this.result = `🚫 Hata: ${err.message}`;
    } finally {
      this.isLoading = false;
console.log('isLoading Durumu =>', this.isLoading)
    }
  }
}

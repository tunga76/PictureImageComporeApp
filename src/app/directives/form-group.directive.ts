import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  AfterViewInit,
  HostListener,
  Renderer2,
  inject
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ValidatorFn
} from '@angular/forms';

@Directive({
  selector: '[appReactiveForm]',
  standalone: true,
  exportAs: 'appReactiveForm',
})
export class ReactiveFormDirective implements OnInit, AfterViewInit {
  private fb = inject(FormBuilder);
  private host = inject(ElementRef<HTMLFormElement>);
  private renderer = inject(Renderer2);

  @Input('appReactiveForm') formDef?: { [key: string]: [any, ValidatorFn[]] };
  @Output() submitted = new EventEmitter<any>();

  formGroup!: FormGroup;

  // Varsayılan tanım burada
  private defaultFormDefinition: { [key: string]: [any, ValidatorFn[]] } = {
      email : ['', [Validators.required, Validators.email]],
      name : ['Hikmet Tunga', [Validators.required, Validators.minLength(3)]],
      birthDay:[new Date('1976-12-12'), [Validators.required]],
      city:['', [Validators.required, Validators.minLength(2)]]
  };

  ngOnInit() {
    const def = this.formDef ?? this.defaultFormDefinition;
    this.formGroup = this.createFormGroup(def);
  }

  ngAfterViewInit() {
    const elements = this.host.nativeElement.querySelectorAll('[name]');
    elements.forEach((el: Element) => {
      const name = el.getAttribute('name');
      if (name && this.formGroup.contains(name)) {
        this.renderer.setAttribute(el, 'formControlName', name);
      }
    });

    // form'a formGroup binding'i
    this.renderer.setAttribute(this.host.nativeElement, 'ngForm', '');
    this.renderer.setAttribute(this.host.nativeElement, 'formGroup', '');
  }

  @HostListener('submit', ['$event'])
  onSubmit(event: Event) {
    event.preventDefault();
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.submitted.emit(this.formGroup.value);
    }
  }

  private createFormGroup(def: { [key: string]: [any, ValidatorFn[]] }): FormGroup {
    const group: { [key: string]: FormControl } = {};
    for (const key in def) {
      const [defaultValue, validators] = def[key];
      group[key] = new FormControl(defaultValue, validators);
    }
    return this.fb.group(group);
  }

    ngOnDestroy() {
    this.formGroup?.reset();
  }
}

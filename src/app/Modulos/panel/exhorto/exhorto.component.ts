import { ChangeDetectorRef, Component, ElementRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'src/app/shared/ng-zorro';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExhortoNuevo } from 'src/app/Model/exhortos/ExhortoNuevo';
import { ExhortosService } from 'src/app/Services/exhortos.service';

import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { NZ_I18N, es_ES } from 'ng-zorro-antd/i18n';
import { File } from 'src/app/Model/File/File';
import { Archivo } from 'src/app/Model/Archivo/archivo';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ExhortoPersonas } from 'src/app/Model/exhortos/ExhortoPersonas';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TitleComponent } from 'src/app/Components/title/title.component';
import { EntidadFederativa } from '../../../Interfaces/entidad-federativa.interface';
import { Materias } from 'src/app/Interfaces/materias.interface';
import { Municipios } from 'src/app/Interfaces/municipios.interface';
import { Personas } from 'src/app/Interfaces/personas.interface';
import Swal from 'sweetalert2';

registerLocaleData(es);
@Component({
  selector: 'app-exhorto',
  standalone: true,
  imports: [CommonModule,NgZorroAntdModule,ReactiveFormsModule,FormsModule,PdfViewerModule,TitleComponent],
  templateUrl: './exhorto.component.html',
  styleUrls: ['./exhorto.component.scss'],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
})
export class ExhortoComponent implements OnInit {

  isVisible = false;
  file: File = new File();
  loadPdf = false;
  loadingEnviarExhorto = false;
  private formBuilder = inject(FormBuilder);
  private servicioExhortos = inject(ExhortosService);
  private cdr = inject (ChangeDetectorRef);
  private message: NzMessageService = inject(NzMessageService);

  Personas!: FormGroup;

  formularioExhorto!: FormGroup;
  nuevoExhorto: ExhortoNuevo = new ExhortoNuevo();
  personas: ExhortoPersonas = new ExhortoPersonas();
  EntidFederativa: EntidadFederativa[] = [];
  CatalogoMateria: Materias []= [];
  CatMunicipios: Municipios []= [];
  listaPersonas: any[] = [];
  date = null;
  srcs:string[] = [];
  srcsAcuerdos:string[] = [];
  srcsAnexos:string[] = [];
  previewfile: boolean = false;

  activeDocument: any;
  isModalVisible = false;
  progresbar: number = 0;

  fileList: any[] = [];

  // constructor() { }
  // @ViewChild('videoElement') videoElement!: ElementRef; // Add '!' to indicate that it will be initialized later
  // @ViewChild('canvasElement') canvasElement!: ElementRef;
  // stream: any;

  ngAfterViewInit() {
    // Actualiza alguna expresión aquí

    // Luego, solicita a Angular que realice una segunda pasada de detección de cambios
    // this.startWebcam();

    this.cdr.detectChanges();
  }
  // async startWebcam() {
  //   try {
  //     const constraints = { video: true };
  //     this.stream = await navigator.mediaDevices.getUserMedia(constraints);
  //     this.videoElement.nativeElement.srcObject = this.stream;
  //   } catch (error) {
  //     console.error('Error accessing media devices.', error);
  //   }
  // }

// stopWebcam() {
//     if (this.stream) {
//       this.stream.getTracks().forEach((track: any) => track.stop());
//       this.videoElement.nativeElement.srcObject = null;
//       this.stream = null;
//     }
//      // Clear the canvas
//      const canvas = this.canvasElement.nativeElement;
//      const context = canvas.getContext('2d');
//      context.clearRect(0, 0, canvas.width, canvas.height);
// }
// takePhoto() {
//   const canvas = this.canvasElement.nativeElement;
//   const context = canvas.getContext('2d');
//   context.drawImage(this.videoElement.nativeElement, 0, 0, canvas.width, canvas.height);
//   const data = canvas.toDataURL('image/png');
//   console.log(data);
// }
  ngOnInit(): void {

    setTimeout(() => {
      const form = document.getElementById('myForm');
      if (form) {
        form.classList.remove('hidden');
      }
    }, 5000);
    this.EstadosGet();
    // this.Fisicas = this.formBuilder.group({
    //   tipo: [null, Validators.required],
    //   nombre: ['', Validators.required],
    //   paterno: ['', Validators.required],
    //   materno: ['', Validators.required],
    //   Genero: ['', Validators.required],
    //   Parte: ['', Validators.required],
    //   ParteOtro: ['', Validators.required],
    //   // PersonasFisicas: new FormArray([
    //   //   new FormGroup({
    //   //   Nombre: new FormControl('', Validators.required),
    //   //   Apaterno: new FormControl('',Validators.required),
    //   //   Amaterno: new FormControl('',Validators.required),
    //   //   Genero: new FormControl('',Validators.required),
    //   //   })
    //   // ]),
    // })
    this.formularioExhorto = this.formBuilder.group({

      Entidad: [null, Validators.required],
      Materia: [null, Validators.required],
      Municipio: [null, Validators.required],
      ExhortoOrigen: [null, [Validators.required, Validators.pattern('')]],
      ClaveJuzgadoOrigen: [null, null],
      NombreJuzgadoOrigen: [null, [Validators.required, Validators.pattern('')]],
      NumeroExpedienteOrigen: [null, [Validators.required, Validators.pattern('')]],
      NumeroOficioOrigen: [null, null],
      JuicioAsuntoDelitos: [null, [Validators.required, Validators.pattern('')]],
      JuezExhortante: [null, null],
      // tpersona: [null, Validators.required],
      // NombreMoral:[null,null],
      // NombreMoral: [null, [Validators.required,Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\s\-]{0,254}')]],
      // Apaterno: [null, [Validators.required,Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\s\-]{0,254}')]],
      // Amaterno: [null, [Validators.required,Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\s\-]{0,254}')]],

      // Genero: [null, Validators.required],
      // Parte: [null, Validators.required],
      // ParteOtro: [null,[Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ\s\-]{0,254}')]],
      listaPersonas: [null, Validators.required],
      Fojas: [null, [Validators.required, Validators.pattern('[0-9]{0,10}')]],
      DiasResponder: [null, [Validators.required, Validators.pattern('[0-9]{0,10}')]],
      NombreDiligenciacion: [null, [Validators.required]],

      date:[null,null],
      file: [null, null],
      fileAcuerdos: [null, null], // Acuerdos
      fileAnexos: [null, null], // Anexos
      Seguridad: [null, [Validators.required]],
      Observaciones: [null,null],

      // direcciones: new FormArray([]),
      // direcciones2: this.formBuilder.array([]),
      // nombres: this.formBuilder.array([]),
    })
    this.Personas = this.formBuilder.group({
      tpersona: [null,Validators.required],
      nombre:[null,Validators.required],
      Apaterno:[null,Validators.required],
      Amaterno:[null,Validators.required],
      Genero:[null,Validators.required],
      Parte:[null,Validators.required],
      ParteOtro:[null,Validators.required],
    })
    this.file.documentos.push(new Archivo());
    this.file.documentosAcuerdos.push(new Archivo());
    this.file.documentosAnexos.push(new Archivo());
  }


  current = 0;
  index = 'First-content';

  pre(): void {
    this.current -= 1;
    this.changeContent();
    this.cdr.detectChanges();

  }

  next(): void {
    this.current += 1;
    this.changeContent();
    this.cdr.detectChanges();

  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  showModal(): void {
    this.personas.esPersonaMoral = 2;
    this.isVisible = true;
  }
  handleOk(): void {
    // console.log(this.Fisicas.value);
    this.isVisible = false;

  }
  CancelModal(){
    this.isVisible = false;
    this.Personas.reset();
  }
  mensajes(type: string,mensaje:string): void {
    this.message.create(type, mensaje);
  }
  // get PFisicas() {
  //   return this.Fisicas.get('PersonasFisicas') as FormArray;
  // }
  // addPF(){
  //   const control = <FormArray>this.Fisicas.controls['PersonasFisicas'];
  //   control.push(
  //     new FormGroup({
  //       Nombre: new FormControl('', Validators.required),
  //       Apaterno: new FormControl('',Validators.required),
  //       Amaterno: new FormControl('',Validators.required),
  //       Genero: new FormControl('',Validators.required),
  //     })
  //   )
  // }
  // removePF(index:any){
  //   const control = <FormArray>this.Fisicas.controls['PersonasFisicas'];
  //   control.removeAt(index);
  // }
  // get direcciones2() {
  //   return this.formularioExhorto.get('direcciones2') as FormArray;
  // }
  // addDireccion() {
  //   this.direcciones2.push(this.formBuilder.control('', Validators.required));
  //   // this.direcciones2.push(this.formBuilder.group({
  //   //   calle: new FormControl('', Validators.required),
  //   //   numero: new FormControl('', Validators.required),
  //   // }));
  // }
  // removeDireccion(index: number) {
  //   this.direcciones2.removeAt(index);
  // }
  // get nombres(){
  //   return this.formularioExhorto.get('nombres') as FormArray;
  // }
  // addNombres(){
  //    const nombresForm = this.formBuilder.group({
  //     nombre:['', Validators.required],
  //     edad:['', Validators.required],
  //    });
  //    this.nombres.push(nombresForm);
  //    console.log(this.nombres);
  // }
  // items!: FormArray;
  // addnew(){
  //   this.items =<FormArray> this.formularioExhorto.get('direcciones') as FormArray;
  //   this.items.push(this.formBuilder.group({
  //     calle: new FormControl('', Validators.required),
  //     numero: new FormControl('', Validators.required),
  //   }));
  // }
  // get deladdress(){
  //   return this.formularioExhorto.get('direcciones') as FormArray;
  // }

  // removeAddress(index:any){
  //   this.items = this.formularioExhorto.get('direcciones') as FormArray;
  //   this.items.removeAt(index);
  // }
  onChange(result: Date): void {

  }

  async EstadosGet(): Promise<void>{
    try {
       const response = await this.servicioExhortos.getEntidadesFederativas();
       if(response?.success){
        this.EntidFederativa = response.data;
       }
    } catch (error) {
      console.log(error);
    }
  }
  async onSelectEstado(evt: string) {
    const id_estado = evt;
     if( !!!evt)return
    try {
      // this.CatalogoMateria = [];
      // this.CatMunicipios = [];
      // this.formularioExhorto.controls['Materia'].reset();
      // this.formularioExhorto.controls['Municipio'].reset();
      const response = await this.servicioExhortos.getDatosEntidadesFederativas(id_estado);
      if(response && response.success){
        const materias = response.data.materias;
        const municipios = response.data.municipios;
        this.CatalogoMateria = materias;
        this.CatMunicipios = municipios;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async onSelectMunicipio(evt:string){
    // console.log(evt);
  }
  ChangeTipoPersona(evt: number) {
    //fisica
    if (!evt) return;
    if(evt == 2){
      this.personas.esPersonaMoral = evt;
      this.Personas.controls['nombre'].setValidators([Validators.required]);
      this.Personas.controls['nombre'].updateValueAndValidity();
      this.Personas.controls['Apaterno'].setValidators([Validators.required]);
      this.Personas.controls['Apaterno'].updateValueAndValidity();
      this.Personas.controls['Amaterno'].setValidators([Validators.required]);
      this.Personas.controls['Amaterno'].updateValueAndValidity();
      this.Personas.controls['Genero'].setValidators([Validators.required]);
      this.Personas.controls['Genero'].updateValueAndValidity();
      // this.nuevoExhorto.tpersona = evt;
      // console.log('Persona Moral');
      // setTimeout(() => {
        // let PFArray = this.formularioExhorto.get('PersonasFisicas') as FormArray;

        // PFArray.controls.forEach((group) => {
        //   let nombreControl = (group as FormGroup).get('Nombre');
        //   nombreControl?.setValidators([]);
        //   nombreControl?.updateValueAndValidity();

        //   let apaternoControl = (group as FormGroup).get('Apaterno');
        //   apaternoControl?.setValidators([]);
        //   apaternoControl?.updateValueAndValidity();

        //   let amaternoControl = (group as FormGroup).get('Amaterno');
        //   amaternoControl?.setValidators([]);
        //   amaternoControl?.updateValueAndValidity();
        // });

        // this.formularioExhorto.controls['Genero'].setValue("");
        // this.formularioExhorto.controls['Genero'].setValidators([]);
        // this.formularioExhorto.controls['Genero'].updateValueAndValidity();
        this.cdr.detectChanges();
      // },);
    } else if(evt == 1){
      // moral
        // this.nuevoExhorto.tpersona = evt;
        this.Personas.controls['nombre'].setValidators([Validators.required]);
        this.Personas.controls['nombre'].updateValueAndValidity();
        this.Personas.controls['Apaterno'].setValidators([]);
        this.Personas.controls['Apaterno'].updateValueAndValidity();
        this.Personas.controls['Apaterno'].setValue("");
        this.Personas.controls['Amaterno'].setValidators([]);
        this.Personas.controls['Amaterno'].updateValueAndValidity();
        this.Personas.controls['Amaterno'].setValue("");
        this.Personas.controls['Genero'].setValidators([]);
        this.Personas.controls['Genero'].updateValueAndValidity();
        // console.log('Persona Fisica');
      // setTimeout(() => {
        // let PFArray = this.formularioExhorto.get('PersonasFisicas') as FormArray;

        // PFArray.controls.forEach((group) => {
        //   let nombreControl = (group as FormGroup).get('Nombre');
        //   nombreControl?.setValidators([Validators.required]);
        //   nombreControl?.updateValueAndValidity();

        //   let apaternoControl = (group as FormGroup).get('Apaterno');
        //   apaternoControl?.setValidators([Validators.required]);
        //   apaternoControl?.updateValueAndValidity();

        //   let amaternoControl = (group as FormGroup).get('Amaterno');
        //   amaternoControl?.setValidators([Validators.required]);
        //   amaternoControl?.updateValueAndValidity();
        // });

        // this.formularioExhorto.controls['Genero'].setValidators([Validators.required]);
        // this.formularioExhorto.controls['Genero'].updateValueAndValidity();
        this.cdr.detectChanges();
      // },);
    }
    this.cdr.detectChanges();
  }
  async onSelectParte(evt:string){
    if(evt === '0'){
      this.personas.tipoParte = evt;
      this.Personas.controls['ParteOtro'].setValidators([Validators.required]);
      this.Personas.controls['ParteOtro'].updateValueAndValidity();
      this.cdr.detectChanges();
    } else {
      this.Personas.controls['ParteOtro'].setValidators([]);
      this.Personas.controls['ParteOtro'].updateValueAndValidity();
      this.Personas.controls['ParteOtro'].setValue("");
      this.cdr.detectChanges();
    }
    this.cdr.detectChanges();
  }
 async agregarPersona (){
    for (const i in this.Personas.controls) {
      this.Personas.controls[i].markAsDirty();
      this.Personas.controls[i].updateValueAndValidity();
    }
    if (this.Personas.valid) {
      const response = await this.servicioExhortos.InsertPersonas(this.personas);
      if(response && response.success){
        this.mensajes('success','Persona agregada correctamente');
        const personasTable = await this.servicioExhortos.GetPersonas();
        if(personasTable && personasTable.success){
          this.listaPersonas = personasTable.data;

        }
        this.CancelModal();
      }else{
        this.mensajes('error','Error al agregar a la persona');
      }
    }
  }
 async DeletePersona(id: number){
    const responseDeletePersona = await this.servicioExhortos.DeletePersona(id);
    console.log(responseDeletePersona);
    if(responseDeletePersona && responseDeletePersona.success){
      this.mensajes('success','Persona eliminada correctamente');
      const personasTable = await this.servicioExhortos.GetPersonas();

      if(personasTable?.success){
        this.listaPersonas = personasTable.data;
      }
    }else{
      this.mensajes('error','Error al eliminar a la persona');
    }
 }
 cancel(evt:any): void {
  }
  async selectMultipleImageDinamico(event:any, tipo: number){
    if(tipo === 1){
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const validacionfile = file.type;
        if (validacionfile === 'application/pdf') {
          // const intervalTime = this.calculateInterval(file.size);
          // this.simulateUpload(file,intervalTime);
          this.file.documentos[0].files.push(event.target.files[i]);
          this.progresbar = 100;
        } else {
          this.mensajes('error','Error, solo se permiten archivos PDF');
        }
      }
      console.log(this.file.documentos[0].files);
    }else if(tipo === 2){
      // this.srcsAcuerdos = [];
      // this.srcsAcuerdos = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const validacionfile = file.type;
        if (validacionfile === 'application/pdf') {
          this.file.documentosAcuerdos[0].filesAcuerdos.push(event.target.files[i]);
          this.progresbar = 100;
        }else {
          this.mensajes('error','Error, solo se permiten archivos PDF');
        }
      }
      console.log(this.file.documentosAcuerdos[0].filesAcuerdos);

    }else if(tipo === 3){
      // this.srcsAnexos = [];
      // this.srcsAnexos = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const validacionfile = file.type;
        if (validacionfile === 'application/pdf') {
          this.file.documentosAnexos[0].filesAnexos.push(event.target.files[i]);
          this.progresbar = 100;
        }else {
        this.mensajes('error','Error, solo se permiten archivos PDF');
        }
        // const intervalTime = this.calculateInterval(file.size);
        // this.simulateUpload(file,intervalTime);
      }
      console.log(this.file.documentosAnexos[0].filesAnexos);
    }
    event.target.value = '';
  }
  calculateInterval(fileSize:any) {
    // Ajusta este valor para cambiar la velocidad de la simulación
    const baseInterval = 20;

    // Calcula un intervalo de tiempo basado en el tamaño del archivo
    // Los archivos más grandes tendrán un intervalo de tiempo más largo
    return baseInterval * (fileSize / 1024 / 1024);
  }
  simulateUpload(file:any,intervalTime:any) {
    const totalIncrements = 100; // El total de incrementos representa el 100%
    const increment = file.size / totalIncrements; // Calcula el incremento en base al tamaño del archivo
    const interval = setInterval(() => {
      file.progress += increment; // Incrementa el progreso
      if (file.progress >= file.size) {
        file.progress = file.size; // Asegura que el progreso no supere el tamaño del archivo
        clearInterval(interval); // Detiene el intervalo cuando el progreso alcanza el tamaño del archivo
      }
    }, intervalTime);  // Actualiza el progreso cada 500 milisegundos
  }
  getPercentage(file:any) {
    return Math.floor((file.progress / file.size) * 100);
  }
  cancelfile(fileToDelete:any, tipo:number) {
    if(tipo === 1){
      const index = this.file.documentos[0].files.indexOf(fileToDelete);
      console.log(index);
      if (index > -1) {
        this.file.documentos[0].files.splice(index, 1);
        console.log(this.file.documentos[0].files);
      }
    }else if(tipo === 2){
      const index = this.file.documentosAcuerdos[0].filesAcuerdos.indexOf(fileToDelete);
      if (index > -1) {
        this.file.documentosAcuerdos[0].filesAcuerdos.splice(index, 1);
        console.log(this.file.documentosAcuerdos[0].filesAcuerdos);
      }
    }else if(tipo === 3){
      const index = this.file.documentosAnexos[0].filesAnexos.indexOf(fileToDelete);
      if (index > -1) {
        this.file.documentosAnexos[0].filesAnexos.splice(index, 1);
        console.log(this.file.documentosAnexos[0].filesAnexos);
      }
    }

    this.cdr.detectChanges();
  }
  FileReader(file:any){
    const reader = new FileReader();
      // reader.onload = (e: any) => {
      //   this.activeDocument = new Uint8Array(e.target.result);
      // };
      // reader.readAsArrayBuffer(file);
      const objectUrl = URL.createObjectURL(file);
      this.activeDocument = objectUrl;
      this.isModalVisible = true;
  }
  VerDocumento(index:number,tipo:number){
    if(tipo === 1){
      const file = this.file.documentos[0].files[index];
      if(file){
        this.FileReader(file);
      }
    }else if(tipo === 2){
      const file = this.file.documentosAcuerdos[0].filesAcuerdos[index];
      if(file){
        this.FileReader(file);
      }
    }else if(tipo === 3){
      const file = this.file.documentosAnexos[0].filesAnexos[index];
      if(file){
        this.FileReader(file);
      }
    }
  }

  limpiarFiles(tipo:number){
    if(tipo === 1){
      this.file.documentos[0].files = [];
      console.log(this.file.documentos[0].files);
    }else if(tipo === 2){
      this.file.documentosAcuerdos[0].filesAcuerdos = [];
      console.log(this.file.documentosAcuerdos[0].filesAcuerdos);
    }else if(tipo === 3){
      this.file.documentosAnexos[0].filesAnexos = [];
      console.log(this.file.documentosAnexos[0].filesAnexos);
    }
    this.cdr.detectChanges();
  }
  CerrarModalPreview(){
    this.isModalVisible = false;
    this.activeDocument = '';
    let reader = new FileReader();
    reader = new FileReader();
  }
  formatoFecha(){
    let fecha = new Date(this.nuevoExhorto.fechaOrigen);
    let year = fecha.getFullYear();
    let month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Los meses en JavaScript comienzan desde 0
    let day = ('0' + fecha.getDate()).slice(-2);
    let hour = ('0' + fecha.getHours()).slice(-2);
    let minute = ('0' + fecha.getMinutes()).slice(-2);
    this.nuevoExhorto.fechaOrigen = `${year}-${month}-${day} ${hour}:${minute}`;
  }
  reset(){
    this.nuevoExhorto.id_estado =  ''; //entidad federativa
    this.nuevoExhorto.materiaClave = '';//materia
    this.nuevoExhorto.municipioDestinoId = '';//municipio
    this.nuevoExhorto.exhortoOrigenId = '';//exhorto origen
    this.nuevoExhorto.juzgadoOrigenId = '';//clave juzgado origen
    this.nuevoExhorto.numeroExpedienteOrigen = '';//numero expediente origen
    this.nuevoExhorto.numeroOficioOrigen = '';//numero oficio origen
    this.nuevoExhorto.juzgadoOrigenNombre = '';//nombre juzgado origen
    this.nuevoExhorto.tipoJuicioAsuntoDelitos = '';//juicio asunto delitos
    this.nuevoExhorto.juezExhortante = '';//juez exhortante
    this.nuevoExhorto.fojas = '';//fojas
    this.nuevoExhorto.diasResponder = '';//dias responder
    this.nuevoExhorto.tipoDiligenciacionNombre = '';//nombre diligenciacion
    this.nuevoExhorto.fechaOrigen = '';//fecha origen
  }
  async EnviarDatos() {

   for (const i in this.formularioExhorto.controls) {
      this.formularioExhorto.controls[i].markAsDirty();
      this.formularioExhorto.controls[i].updateValueAndValidity();
    }
    if(this.file.documentos[0].files.length === 0 && this.file.documentosAcuerdos[0].filesAcuerdos.length === 0 && this.file.documentosAnexos[0].filesAnexos.length === 0){
      this.mensajes('warning','Error, Debes adjuntar por lo menos un documento ');
    }
    if (this.formularioExhorto.valid) {
      try {
        this.loadingEnviarExhorto = true;
        this.formatoFecha();
        const formData = new FormData();
        this.file.documentos.forEach((element: any, i: any) => {
          if (this.file.documentos[i]?.files.length > 0) {
            this.file.documentos[i]?.files.forEach(
              (f: any) => {
                formData.append('oficio[]', f);
              }
            );
          }
        });
        this.file.documentosAcuerdos.forEach((element: any, i: any) => {
          if (this.file.documentosAcuerdos[i]?.filesAcuerdos.length > 0) {
            this.file.documentosAcuerdos[i]?.filesAcuerdos.forEach(
              (f: any) => {
                formData.append('acuerdo[]', f);
              }
            );
          }
        });
        this.file.documentosAnexos.forEach((element: any, i: any) => {
          if (this.file.documentosAnexos[i]?.filesAnexos.length > 0) {
            this.file.documentosAnexos[i]?.filesAnexos.forEach(
              (f: any) => {
                formData.append('anexo[]', f);
              }
            );
          }
        });
        const response = await this.servicioExhortos.InsertExhorto(this.nuevoExhorto,formData);
        if(response && response.success){
          this.mensajes('success','Exhorto agregado correctamente');
          this.file.documentos[0].files = [];
          this.file.documentosAcuerdos[0].filesAcuerdos = [];
          this.file.documentosAnexos[0].filesAnexos = [];
          this.srcs = [];
          this.srcsAcuerdos = [];
          this.srcsAnexos = [];
          this.listaPersonas = [];
          this.previewfile = false;
          this.current = 0;
          this.index = 'First-content';
          this.formularioExhorto.reset();
          this.reset();
          this.loadingEnviarExhorto = false;
          setTimeout(() => {
            const urlpdf = response.data.documentos[0].acuse?.urlInfo;
            if (urlpdf) {
              window.open(urlpdf, '_blank');
            }
            this.cdr.detectChanges();
          }, 1000);
          this.cdr.detectChanges();
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      this.mensajes('error','Error, por favor llena todos los campos obligatorios');
    }
  }

}

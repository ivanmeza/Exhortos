import { Component, OnInit, ViewChild, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'src/app/shared/ng-zorro';
import Swal from 'sweetalert2';
import { TableModule } from 'primeng/table';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Table } from 'primeng/table';
import { Archivo } from 'src/app/Model/Archivo/archivo';
import { File } from 'src/app/Model/File/File';
import { TagModule } from 'primeng/tag';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { ExhortosService } from 'src/app/Services/exhortos.service';
import { ExhortoResponde } from 'src/app/Model/exhortos/ExhortoResponde';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ExhortosRecibidosPendientes, ResponsePendientesTable } from 'src/app/Services/Interfaces/Respuestas-Exhortos-Pendientes/ResponsePendientesTable';
import { ArchivosResVerExPendientes, ResponseExhortosPendientesVerExhorto } from 'src/app/Services/Interfaces/Respuestas-Exhortos-Pendientes/ResponseExhortosPendientesVerExhorto';
import { LoadingFilesComponent } from 'src/app/Components/loading-files/loading-files.component';
@Component({
  selector: 'app-respuesta-pendientes',
  standalone: true,
  templateUrl: './respuesta-pendientes.component.html',
  styleUrls: ['./respuesta-pendientes.component.scss'],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    TagModule,
    ToastModule,
    SplitButtonModule,
    DialogModule,
    DropdownModule,
    TabViewModule,
    BadgeModule,
    PdfViewerModule,
    LoadingFilesComponent
  ],
})
export class RespuestaPendientesComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  private servicioExhortos = inject(ExhortosService);
  private formBuilder = inject(FormBuilder);
  private sanitizer = inject(DomSanitizer);
  private message: NzMessageService = inject(NzMessageService);
  private cdr = inject(ChangeDetectorRef);
  formularioExhorto!: FormGroup;
  respondeExhorto: ExhortoResponde = new ExhortoResponde();
  exhortos: ExhortosRecibidosPendientes[] = [];
  file: File = new File();
  registros = 10;
  pageIndex = 1;
  visible: boolean = false;
  visible2: boolean = false;
  exhorto: any;
  exhortoR: ResponseExhortosPendientesVerExhorto["data"]= {} as ResponseExhortosPendientesVerExhorto["data"];
  pdfVisible: boolean = false;
  pdfUrl: SafeResourceUrl = '';
  private timerInterval?: number;
  progresbar: number = 0;
  activeDocument: any;
  isModalVisible = false;
  valiable: any;
  visibleLoading:boolean = false;
  isLoadingFile: boolean = false;
  onIframeLoad(): void {
    // setTimeout(() => {
    //   this.isLoadingFile = false;
    // }, 4000);
  }
  ngOnInit(): void {
    this.getExhortosRecibidos(this.pageIndex, this.registros);
  }

  async getExhortosRecibidos(pageIndex: number, registros: number): Promise<void> {
    try {
      const response: any = await this.servicioExhortos.getRespuestaPendientes(pageIndex, registros) || {} as ResponsePendientesTable;

      // Verificar si la respuesta es un objeto
      if (typeof response === 'object' && response !== null) {
        // Verificar si la propiedad "success" es true
        if (response.success) {
          // Asignar la propiedad "data" del objeto a this.exhortos
          this.exhortos = response.data.data;

        } else {
          console.error('Error en la respuesta de la API:', response.message);
        }
      } else {
        console.error('La respuesta de la API no es un objeto válido');
      }
    } catch (error) {
      console.error('Error al obtener los exhortos pendientes:', error);
    }
  }


  handlePageChange(event: any) {
    this.pageIndex = event.first + 1;
    this.getExhortosRecibidos(this.pageIndex, this.registros);
    //console.log(this.pageIndex)
  }

  handleCancel() {
    this.visible = false;
    this.file.documentos[0].files = [];
    this.file.documentosAcuerdos[0].filesAcuerdos = [];
    this.file.documentosAnexos[0].filesAnexos = [];
    this.formularioExhorto.reset();
  }

  handleCancel2() {
    this.visible2 = false;
  }

  // Método para abrir el diálogo y asignar los datos del exhorto
  openDialog(exhortoId: number): void {
    this.visible = true; // Mostrar el diálogo
    this.formularioExhorto.get('id_exhorto')?.setValue(exhortoId);
    this.valiable = this.formularioExhorto.get('id_exhorto')?.value;
    //console.log(this.valiable); // Debería mostrar el valor correcto
  }

  openDialogRespuesta(idrespuestaexhorto: ExhortosRecibidosPendientes['idrespuestaexhorto']): void {
    this.getInfoRespuestaExhorto(idrespuestaexhorto);
  }

  async getInfoRespuestaExhorto(idrespuestaexhorto: ExhortosRecibidosPendientes['idrespuestaexhorto']): Promise<void> {
    this.visibleLoading = true;
    try {
      const response: ResponseExhortosPendientesVerExhorto = await this.servicioExhortos.getInfoRespuestaExhorto(idrespuestaexhorto) || {} as ResponseExhortosPendientesVerExhorto;
      // Verificar si la respuesta es un objeto
      if (typeof response === 'object' && response !== null) {
        // Verificar si la propiedad "success" es true
        if (response.success) {
          // Asignar la propiedad "data" del objeto a this.exhortos
          this.exhortoR = response.data;
          if(this.exhortoR){
            this.visibleLoading = false;
            this.visible2 = true; // Mostrar el diálogo
          }else{
            this.visibleLoading = false;
            console.log('no se cargo bien la informacion para mostrarla en el modal')
          }
          // console.log(this.exhortoR)
        } else {
          this.visibleLoading = false;
          console.error('Error en la respuesta de la API:', response.message);
        }
      } else {
        this.visibleLoading = false;
        console.error('La respuesta de la API no es un objeto válido');
      }
    } catch (error) {
      console.error('Error al obtener los exhortos pendientes:', error);
      this.visibleLoading = false;
    }
  }

  async getVisualizarExhorto(idexhorto: number): Promise<void> {
    return;
    // this.visible = true;
    // try {
    //   const response: any = await this.servicioExhortos.getVerExtortos(idexhorto) || {};

    //   if (typeof response === 'object' && response !== null) {

    //     if (response.success) {

    //       this.exhorto = response.data;
    //       console.log(this.exhorto);
    //     } else {
    //       console.error('Error en la respuesta de la API:', response.message);
    //     }
    //   } else {
    //     console.error('La respuesta de la API no es un objeto válido');
    //   }
    // } catch (error) {
    //   console.error('Error al obtener los exhortos pendientes:', error);
    // }
  }

  async getEnviarExhorto(exhortoOrigenId: number): Promise<void> {
    // this.visible = false;
    // try {
    //   const response: any = await this.servicioExhortos.getEnviarExtortos(exhortoOrigenId) || {};
    //   // Muestra la alerta inicial según la respuesta obtenida
    //   this.mostrarAlerta(response.success ? 'success' : 'error', response.message);
    //   this.getExhortosRecibidos(this.pageIndex, this.registros);
    // } catch (error: any) {
    //   // Si no tiene la estructura esperada, mostrar un mensaje genérico
    //   this.mostrarAlerta('error', 'El Exhorto Origen ya existe');

    // }
  }

  async getEnviarRespuesta(idrespuestaexhorto: number): Promise<void> {
    this.visible2 = false;
    try {
      const response: any = await this.servicioExhortos.getEnviarRespuesta(idrespuestaexhorto) || {};
      // Muestra la alerta inicial según la respuesta obtenida
      this.mostrarAlerta(response.success ? 'success' : 'error', response.message);
      this.getExhortosRecibidos(this.pageIndex, this.registros);
    } catch (error: any) {
      // Si no tiene la estructura esperada, mostrar un mensaje genérico
      this.mostrarAlerta('error', 'El Exhorto Origen ya existe');

    }
  }


  mostrarAlerta(type: 'success' | 'error', message: string): void {
    Swal.fire({
      title: 'Espere que se carguen los datos',
      html: '<b></b> milliseconds.',
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer()?.querySelector('b');
        if (b) {
          this.timerInterval = setInterval(() => {
            b.textContent = String(Swal.getTimerLeft() as number);
          }, 100) as any;
        }
      },
      willClose: () => {
        clearInterval(this.timerInterval);
      }
    }).then((result) => {
      // Después de que se cierre la primera alerta, muestra la segunda alerta
      if (result.dismiss === Swal.DismissReason.timer) {
        Swal.fire({
          title: type === 'success' ? 'Registro exitoso' : 'Error al registrar',
          text: type === 'error' ? message : '',
          icon: type
        });
      }
    });
  }

  async getRespondeExhorto(): Promise<void> {
    for (const i in this.formularioExhorto.controls) {
      this.formularioExhorto.controls[i].markAsDirty();
      this.formularioExhorto.controls[i].updateValueAndValidity();
    }

    if (this.file.documentos[0].files.length === 0 && this.file.documentosAcuerdos[0].filesAcuerdos.length === 0 && this.file.documentosAnexos[0].filesAnexos.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Debes adjuntar por lo menos un documento',
      });
      return;
    }

    if (this.formularioExhorto.valid) {
      try {
        const formData = new FormData();
        this.file.documentos.forEach((element: any, i: any) => {
          if (this.file.documentos[i]?.files.length > 0) {
            this.file.documentos[i]?.files.forEach((f: any) => {
              formData.append('oficio[]', f);
            });
          }
        });
        this.file.documentosAcuerdos.forEach((element: any, i: any) => {
          if (this.file.documentosAcuerdos[i]?.filesAcuerdos.length > 0) {
            this.file.documentosAcuerdos[i]?.filesAcuerdos.forEach((f: any) => {
              formData.append('acuerdo[]', f);
            });
          }
        });
        this.file.documentosAnexos.forEach((element: any, i: any) => {
          if (this.file.documentosAnexos[i]?.filesAnexos.length > 0) {
            this.file.documentosAnexos[i]?.filesAnexos.forEach((f: any) => {
              formData.append('anexo[]', f);
            });
          }
        });
        const idExhorto = this.formularioExhorto.get('id_exhorto')?.value;
        this.respondeExhorto.id_exhorto = idExhorto;
        console.log(this.respondeExhorto);

        const response = await this.servicioExhortos.InsertExhortoResponde(this.respondeExhorto, formData);
        if (response && response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Exhorto agregado correctamente',
          });
          this.file.documentos[0].files = [];
          this.file.documentosAcuerdos[0].filesAcuerdos = [];
          this.file.documentosAnexos[0].filesAnexos = [];
          this.formularioExhorto.reset();
          this.cdr.detectChanges();
          this.visible = false;
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al agregar el exhorto',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor llena todos los campos obligatorios',
      });
    }
  }

  verDocumento(url: ArchivosResVerExPendientes['url_archivo']) {
    this.isLoadingFile= true


    try {
      if(url !== ''){
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        if(this.pdfUrl){
          setTimeout(() => {
            this.pdfVisible = true;
            this.isLoadingFile = false
          }, 800);
          // this.pdfVisible = true;
        }else{
          this.isLoadingFile = false;
          this.mensajes('error', 'Error, no se cargo el documento en la variable pdfUrl');
        }
      }else{
        this.isLoadingFile = false;
        this.mensajes('error', 'Error, no se recibio la url del documento');
      }
    } catch (error) {
      this.isLoadingFile = false;
      console.log(error);
    }
  }

  handleCancelPdf() {
    this.pdfVisible = false;
  }

  mensajes(type: string, mensaje: string): void {
    this.message.create(type, mensaje);
  }

  async selectMultipleImageDinamico(event: any, tipo: number) {
    if (tipo === 1) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const validacionfile = file.type;
        if (validacionfile === 'application/pdf') {
          // const intervalTime = this.calculateInterval(file.size);
          // this.simulateUpload(file,intervalTime);
          this.file.documentos[0].files.push(event.target.files[i]);
          this.progresbar = 100;
        } else {
          this.mensajes('error', 'Error, solo se permiten archivos PDF');
        }
      }
      console.log(this.file.documentos[0].files);
    } else if (tipo === 2) {
      // this.srcsAcuerdos = [];
      // this.srcsAcuerdos = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const validacionfile = file.type;
        if (validacionfile === 'application/pdf') {
          this.file.documentosAcuerdos[0].filesAcuerdos.push(event.target.files[i]);
          this.progresbar = 100;
        } else {
          this.mensajes('error', 'Error, solo se permiten archivos PDF');
        }
      }
      console.log(this.file.documentosAcuerdos[0].filesAcuerdos);

    } else if (tipo === 3) {
      // this.srcsAnexos = [];
      // this.srcsAnexos = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const validacionfile = file.type;
        if (validacionfile === 'application/pdf') {
          this.file.documentosAnexos[0].filesAnexos.push(event.target.files[i]);
          this.progresbar = 100;
        } else {
          this.mensajes('error', 'Error, solo se permiten archivos PDF');
        }
        // const intervalTime = this.calculateInterval(file.size);
        // this.simulateUpload(file,intervalTime);
      }
      console.log(this.file.documentosAnexos[0].filesAnexos);
    }
    event.target.value = '';
  }
  calculateInterval(fileSize: any) {
    // Ajusta este valor para cambiar la velocidad de la simulación
    const baseInterval = 20;

    // Calcula un intervalo de tiempo basado en el tamaño del archivo
    // Los archivos más grandes tendrán un intervalo de tiempo más largo
    return baseInterval * (fileSize / 1024 / 1024);
  }
  simulateUpload(file: any, intervalTime: any) {
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
  getPercentage(file: any) {
    return Math.floor((file.progress / file.size) * 100);
  }
  cancelfile(fileToDelete: any, tipo: number) {
    if (tipo === 1) {
      const index = this.file.documentos[0].files.indexOf(fileToDelete);
      console.log(index);
      if (index > -1) {
        this.file.documentos[0].files.splice(index, 1);
        console.log(this.file.documentos[0].files);
      }
    } else if (tipo === 2) {
      const index = this.file.documentosAcuerdos[0].filesAcuerdos.indexOf(fileToDelete);
      if (index > -1) {
        this.file.documentosAcuerdos[0].filesAcuerdos.splice(index, 1);
        console.log(this.file.documentosAcuerdos[0].filesAcuerdos);
      }
    } else if (tipo === 3) {
      const index = this.file.documentosAnexos[0].filesAnexos.indexOf(fileToDelete);
      if (index > -1) {
        this.file.documentosAnexos[0].filesAnexos.splice(index, 1);
        console.log(this.file.documentosAnexos[0].filesAnexos);
      }
    }

    this.cdr.detectChanges();
  }
  FileReader(file: any) {
    const reader = new FileReader();
    // reader.onload = (e: any) => {
    //   this.activeDocument = new Uint8Array(e.target.result);
    // };
    // reader.readAsArrayBuffer(file);
    const objectUrl = URL.createObjectURL(file);
    this.activeDocument = objectUrl;
    this.isModalVisible = true;
  }
  VerDocumento(index: number, tipo: number) {
    if (tipo === 1) {
      const file = this.file.documentos[0].files[index];
      if (file) {
        this.FileReader(file);
      }
    } else if (tipo === 2) {
      const file = this.file.documentosAcuerdos[0].filesAcuerdos[index];
      if (file) {
        this.FileReader(file);
      }
    } else if (tipo === 3) {
      const file = this.file.documentosAnexos[0].filesAnexos[index];
      if (file) {
        this.FileReader(file);
      }
    }
  }

  limpiarFiles(tipo: number) {
    if (tipo === 1) {
      this.file.documentos[0].files = [];
      console.log(this.file.documentos[0].files);
    } else if (tipo === 2) {
      this.file.documentosAcuerdos[0].filesAcuerdos = [];
      console.log(this.file.documentosAcuerdos[0].filesAcuerdos);
    } else if (tipo === 3) {
      this.file.documentosAnexos[0].filesAnexos = [];
      console.log(this.file.documentosAnexos[0].filesAnexos);
    }
    this.cdr.detectChanges();
  }
  CerrarModalPreview() {
    this.isModalVisible = false;
    this.activeDocument = '';
    let reader = new FileReader();
    reader = new FileReader();
  }
  fileOficiosLength() {
    return this.file && this.file.documentos && this.file.documentos[0] && this.file.documentos[0].files && this.file.documentos[0].files.length === 0
      ? null
      : this.file.documentos[0].files.length;
  }
  fileAcuerdosLength() {
    return this.file && this.file.documentosAcuerdos && this.file.documentosAcuerdos[0] && this.file.documentosAcuerdos[0].filesAcuerdos && this.file.documentosAcuerdos[0].filesAcuerdos.length === 0
      ? null
      : this.file.documentosAcuerdos[0].filesAcuerdos.length;
  }
  fileAnexosLength() {
    return this.file && this.file.documentosAnexos && this.file.documentosAnexos[0] && this.file.documentosAnexos[0].filesAnexos && this.file.documentosAnexos[0].filesAnexos.length === 0
      ? null
      : this.file.documentosAnexos[0].filesAnexos.length;
  }
  closePdfViewer(): void {
    this.pdfVisible = false; // Ocultar el visor de PDF
  }


  SearchTable(event: any, stringVal: string) {
    if (this.dt) {
      const inputValue = (event.target as HTMLInputElement).value.toLowerCase(); // Convertir a minúsculas
      //this.dt.filterGlobal(inputValue, 'contains');
      this.dt.filterGlobal(inputValue, 'startsWith');
    }
  }

  getStatus(id_estatus: string | undefined): { color: string, text: string } {
    // Verifica si 'id_estatus' es undefined y asigna un valor predeterminado si es necesario
    if (id_estatus === undefined) {
      return { color: 'gray', text: 'INDEFINIDO' };
    }

    // Realiza alguna lógica para determinar la severidad y el color basado en 'id_estatus'
    // Puedes devolver valores específicos según tus criterios
    if (id_estatus.includes('Pendiente')) {
      return { color: '#FFC900', text: 'Pendiente' };
    } else if (id_estatus.includes('Recibido')) {
      return { color: '#00B2FF', text: 'Recibido' };
    } else {
      return { color: 'green', text: 'Respondido' };
    }
  }
}

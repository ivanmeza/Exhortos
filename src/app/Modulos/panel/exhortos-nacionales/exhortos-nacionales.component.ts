import { Component, OnInit, ViewChild, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'src/app/shared/ng-zorro';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TableModule } from 'primeng/table';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MenuItem,MessageService } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { environment } from 'src/environments/environment'
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';

import { BadgeModule } from 'primeng/badge';
import { ExhortosService } from 'src/app/Services/exhortos.service';

import { MenuModule } from 'primeng/menu';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TableExNacionales } from 'src/app/Interfaces/table-ex-nacionales.interface';
import { ExhortoNacional, ResponseExhortosNacionales } from 'src/app/Services/Interfaces/ResponseExhortosNacionales.interface';
@Component({
  selector: 'app-exhortos-nacionales',
  standalone: true,
  templateUrl: './exhortos-nacionales.component.html',
  styleUrls: ['./exhortos-nacionales.component.scss'],
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
    MenubarModule,
    BadgeModule,
    PdfViewerModule,
    MenuModule
  ],
  providers: [MessageService]
})
export class ExhortosNacionalesComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  private servicioExhortos = inject(ExhortosService);
  private sanitizer = inject(DomSanitizer);

  colsTable: TableExNacionales[] = [
    { field: 'ETAPA', header: 'ETAPA', width: '8%' },
    { field: 'EXHORTO DE ORIGEN', header: 'EXHORTO DE ORIGEN', width: '20%' },
    { field: 'FECHA', header: 'FECHA', width: '14%' },
    { field: 'JUZGADO', header: 'JUZGADO', width: '15%' },
    { field: 'MUNICIPIO', header: 'MUNICIPIO' },
    { field: 'ESTADO', header: 'ESTADO' },
    { field: 'ACCIONES', header: 'ACCIONES', width: '15%' }
  ];
  exhortos: ExhortoNacional[] = [];
  registros:number = 10;
  pageIndex:number = 1;
  visible: boolean = false;
  visible2: boolean = false;
  exhorto: any;
  exhortoR: any;
  pdfVisible: boolean = false;
  pdfUrl: SafeResourceUrl = '';
  private timerInterval?: number;


  pdfSrc: string = '/assets/File/CV_IVAN.pdf';

  items: MenuItem[]=[];
  ngOnInit(): void {
    this.getExhortosPendientes(this.pageIndex, this.registros);

    this.items = [
      {
          label: 'New',
          icon: 'pi pi-fw pi-plus',
      },
      {
          label: 'Delete',
          icon: 'pi pi-fw pi-trash'
      }
    ];
  }

  async getExhortosPendientes(pageIndex: number, registros: number): Promise<void> {
    try {
      const response: any = await this.servicioExhortos.getExhortosPendientes(pageIndex, registros) || {};

      // Verificar si la respuesta es un objeto
      if (typeof response === 'object' && response !== null) {
        // Verificar si la propiedad "success" es true
        if (response.success) {
          // Asignar la propiedad "data" del objeto a this.exhortos
          this.exhortos = response.data.data;
          console.log(this.exhortos)
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
    this.getExhortosPendientes(this.pageIndex, this.registros);
    console.log(this.pageIndex)
  }

  handleCancel() {
    this.visible = false;
  }

  handleCancel2() {
    this.visible2 = false;
  }

  handleCancelPdf() {
    this.pdfVisible = false;
  }


  // Método para abrir el diálogo y asignar los datos del exhorto
  openDialogRecibido(exhortoId: number): void {
    this.getConsultarExhorto(exhortoId);
  }

  async getConsultarExhorto(idexhorto: number): Promise<void> {
    this.visible2 = true; // Mostrar el diálogo
    try {
      const response: any = await this.servicioExhortos.getConsultarExtortos(idexhorto) || {};
      // Verificar si la respuesta es un objeto
      if (typeof response === 'object' && response !== null) {
        // Verificar si la propiedad "success" es true
        if (response.success) {
          // Asignar la propiedad "data" del objeto a this.exhorto
          this.exhortoR = response.data;
          console.log(this.exhortoR);
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

  // Método para abrir el diálogo y asignar los datos del exhorto
  openDialogPendiente(exhortoId: number): void {
    this.getVisualizarExhorto(exhortoId);
  }

  async getVisualizarExhorto(idexhorto: number): Promise<void> {
    this.visible = true; // Mostrar el diálogo
    try {
      const response: any = await this.servicioExhortos.getVerExtortos(idexhorto) || {};

      // Verificar si la respuesta es un objeto
      if (typeof response === 'object' && response !== null) {
        // Verificar si la propiedad "success" es true
        if (response.success) {
          // Asignar la propiedad "data" del objeto a this.exhorto
          this.exhorto = response.data;
          console.log(this.exhorto);
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

  async getEnviarExhorto(exhortoOrigenId: number): Promise<void> {
    this.visible = false;
    try {
      const response: any = await this.servicioExhortos.getEnviarExtortos(exhortoOrigenId) || {};
      // Muestra la alerta inicial según la respuesta obtenida
      this.mostrarAlerta(response.success ? 'success' : 'error', response.message);
      this.getExhortosPendientes(this.pageIndex, this.registros);
    } catch (error: any) {
      // Si no tiene la estructura esperada, mostrar un mensaje genérico
      this.mostrarAlerta('error', 'Hubo error con el servidor');

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



  verDocumento(url: string) {

    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.pdfVisible = true;
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
    if (id_estatus === undefined) {//si no recibo la etapa retorno indefinido y el color gris
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




import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficaEventoComponent } from './pages/graficas/grafica-evento/grafica-evento.component';
import { GraficaSensorComponent } from './pages/graficas/grafica-sensor/grafica-sensor.component';
import { EventoComponent } from './pages/eventos/evento/evento.component';
import { NuevoCiaComponent } from './pages/forms/nuevo-cia/nuevo-cia.component';

import { HomeComponent } from './pages/home/home.component';
import { DepartamentosComponent } from './pages/filtro/departamentos/departamentos.component';
import { MaquinasComponent } from './pages/filtro/maquinas/maquinas.component';
import { AreasComponent } from './pages/filtro/areas/areas.component';
import { UsuariosComponent } from './pages/filtro/usuarios/usuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { TipoEquipoComponent } from './pages/filtro/tipo-equipo/tipo-equipo.component';
import { ModuloInterfazComponent } from './pages/filtro/modulo-interfaz/modulo-interfaz.component'
import { NuevoConfiguracionModuloComponent } from './pages/forms/nuevo-configuracion-modulo/nuevo-configuracion-modulo.component'
import { ProductosComponent } from './pages/filtro/productos/productos.component'
import { SubensambleComponent } from './pages/filtro/subensamble/subensamble.component'
import { MateriaPrimaComponent } from '@app/pages/filtro/materia-prima/materia-prima.component'
import { EmpresaComponent } from '@app/pages/filtro/empresa/empresa.component'
import { TurnosProductivosComponent } from '@app/pages/filtro/turnos/registro-turnos-productivos.component'
import { NuevoTurnosComponent } from '@app/pages/forms/nuevo-turnos/nuevo-turnos.component'
import { NuevoEmpresaComponent } from '@app/pages/forms/nuevo-empresa/nuevo-empresa.component'
import { PersonalCalidadComponent } from './pages/filtro/personal-calidad/personal-calidad.component';
import { PersonalIngenieriaComponent } from './pages/filtro/personal-ingenieria/personal-ingenieria.component';
import { PersonalMaterialesComponent } from './pages/filtro/personal-materiales/personal-materiales.component';
import { PersonalOperativoComponent } from './pages/filtro/personal-operativo/personal-operativo.component';
import { PersonalTecnicoComponent } from './pages/filtro/personal-tecnico/personal-tecnico.component';
import { BoardComponent } from './pages/board/board.component'
import { RegistroProduccionLineaComponent } from '@app/pages/filtro/registro-produccion-linea/registro-produccion-linea.component'
import { ProgramaDeProduccionComponent } from '@app/pages/filtro/programa-de-produccion/programa-de-produccion.component'
import { ModuloRMTComponent } from '@app/pages/filtro/modulo-rmt/modulo-rmt.component';
import { ProduccionEjecucionComponent } from '@app/pages/filtro/produccion-ejecucion/produccion-ejecucion.component';
import { HistoricoProduccionComponent } from '@app/pages/filtro/historico-produccion/historico-produccion.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EstadisticasLineaComponent } from '@app/pages/filtro/estadisticas-lineas/estadisticas-lineas.component';
import { EstadisticasEquipoComponent } from '@app/pages/filtro/estadisticas-equipos/estadisticas-equipos.component';
import { GraficoMnttoComponent } from '@app/pages/forms/grafico-mntto/grafico-mntto.component';
import { GraficoMatsComponent } from '@app/pages/forms/grafico-mats/grafico-mats.component';
import { GraficoIngComponent } from '@app/pages/forms/grafico-ing/grafico-ing.component';
import { GraficoProdComponent } from '@app/pages/forms/grafico-prod/grafico-prod.component';
import { GraficoCalidadComponent } from '@app/pages/forms/grafico-calidad/grafico-calidad.component';
import { GraficoTiempomuertoComponent } from '@app/pages/forms/grafico-tiempomuerto/grafico-tiempomuerto.component';
import { GraficoCostosComponent } from '@app/pages/forms/grafico-costos/grafico-costos.component';
import { GraficoOEEComponent } from '@app/pages/forms/grafico-oee/grafico-oee.component';
import { GraficoEficienciaComponent } from '@app/pages/forms/grafico-eficiencia/grafico-eficiencia.component';
import { GraficoSkuComponent } from '@app/pages/forms/grafico-sku/grafico-sku.component';
import { GraficoDisponibilidadComponent } from '@app/pages/forms/grafico-disponibilidad/grafico-disponibilidad.component';
import { GraficoRendimientoComponent } from '@app/pages/forms/grafico-rendimiento/grafico-rendimiento.component';
import { GraficoPcalidadComponent } from '@app/pages/forms/grafico-pcalidad/grafico-pcalidad.component';
import { ControlComponent } from '@app/pages/control/control.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'maquina', component: MaquinasComponent, canActivate: [AuthGuard] },
  { path: 'moduloInterfaz', component: ModuloInterfazComponent, canActivate: [AuthGuard] },
  { path: 'evento', component: EventoComponent, canActivate: [AuthGuard] },
  { path: 'departamento', component: DepartamentosComponent, canActivate: [AuthGuard] },
  { path: 'area', component: AreasComponent, canActivate: [AuthGuard] },
  { path: 'cia/:id', component: NuevoCiaComponent, canActivate: [AuthGuard] },
  { path: 'usuario', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'tablaEstado/:idMaquina', component: GraficaSensorComponent, canActivate: [AuthGuard] },
  { path: 'tipoEquipo', component: TipoEquipoComponent, canActivate: [AuthGuard] },
  { path: 'configuracionModulo/:idPerfil', component: NuevoConfiguracionModuloComponent, canActivate: [AuthGuard] },
  { path: 'producto', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'subensamble', component: SubensambleComponent, canActivate: [AuthGuard] },
  { path: 'materiaPrima', component: MateriaPrimaComponent, canActivate: [AuthGuard] },
  { path: 'personal-calidad', component: PersonalCalidadComponent, canActivate: [AuthGuard] },
  { path: 'personal-ingenieria', component: PersonalIngenieriaComponent, canActivate: [AuthGuard] },
  { path: 'personal-materiales', component: PersonalMaterialesComponent, canActivate: [AuthGuard] },
  { path: 'personal-operativo', component: PersonalOperativoComponent, canActivate: [AuthGuard] },
  { path: 'personal-tecnico', component: PersonalTecnicoComponent, canActivate: [AuthGuard] },
  { path: 'empresa', component: EmpresaComponent, canActivate: [AuthGuard] },
  { path: 'empresa/:id', component: NuevoEmpresaComponent, canActivate: [AuthGuard] },
  { path: 'empresa/add', component: NuevoEmpresaComponent, canActivate: [AuthGuard] },
  { path: 'TurnosProductivos', component: TurnosProductivosComponent, canActivate: [AuthGuard] },
  { path: 'RegistroTurnosProductivos/:id', component: NuevoTurnosComponent, canActivate: [AuthGuard] },
  { path: 'programa-de-produccion', component: ProgramaDeProduccionComponent, canActivate: [AuthGuard] },
  { path: 'programa-de-produccion/:id', component: RegistroProduccionLineaComponent, canActivate: [AuthGuard] },
  { path: 'modulo-RMT', component: ModuloRMTComponent, canActivate: [AuthGuard] },
  { path: 'board/:id', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'produccion-ejecucion', component: ProduccionEjecucionComponent, canActivate: [AuthGuard] },
  { path: 'historico-produccion', component: HistoricoProduccionComponent, canActivate: [AuthGuard] },
  { path: 'graficas/:idMaquina', component: GraficaEventoComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas-equipos', component: EstadisticasEquipoComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas-lineas', component: EstadisticasLineaComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas-equipos/:/mantenimiento', component: GraficoMnttoComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas-equipos/:/materiales', component: GraficoMatsComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas-equipos/:/ingenieria', component: GraficoIngComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas-equipos/:/produccion', component: GraficoProdComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas-equipos/:/calidad', component: GraficoCalidadComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas-lineas/:/tiempo-muerto', component: GraficoTiempomuertoComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas-lineas/:/perdida-financiera', component: GraficoCostosComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas-lineas/:/eficiencia', component: GraficoEficienciaComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas-lineas/:/sku', component: GraficoSkuComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas-lineas/:/oee', component: GraficoOEEComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas-lineas/:/disponibilidad', component: GraficoDisponibilidadComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas-lineas/:/rendimiento', component: GraficoRendimientoComponent, canActivate: [AuthGuard] },
  { path: 'estadisticas-lineas/:/porcentaje-de-calidad', component: GraficoPcalidadComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      routes
    ),
    CommonModule,
    FormsModule,
    
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }

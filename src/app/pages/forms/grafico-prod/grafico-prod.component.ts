import { Component, NgZone, OnInit } from '@angular/core';
import { GraficaProdService } from '@app/services/grafica-prod.service';
import { AuthService } from '@app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-grafico-prod',
  templateUrl: './grafico-prod.component.html',
  styleUrls: ['./grafico-prod.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraficoProdComponent implements OnInit {
  
  form: FormGroup;
  form2: FormGroup;
  submitted = false;
  submitted2 = false;
  r1;
  r2;
  token;
  mycall;
  maquina;
  causa;
  inft;
  datadb:[];
  opt:[];
  private chart: am4charts.XYChart;

  constructor(
    private zone: NgZone,
    private grafica_prodService: GraficaProdService,
    private formBuilde: FormBuilder,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilde.group({
      r1: ['', Validators.required],
      r2: ['', Validators.required],
      maquina: ['', Validators.required],
    });

    this.form2 = this.formBuilde.group({
      causa:['',Validators.required],
    });

    this.token = this.auth.token;
    this.getGraficaProd();
    this.getSelect();
  }

  async getGraficaProd(){
    try{
      let res = await this.grafica_prodService.getp(this.auth.token).toPromise();
      if(res.code = 200){
        this.datadb = res.response;
      }
    }catch(error){}
  }
  
  async getSelect(){
    try{
      let res = await this.grafica_prodService.getMaqp( this.auth.token ).toPromise();
      if(res.code = 200){
        this.opt = res.response;
      }
    } catch (error){
    }
  }


  get efe() { return this.form2.controls; }

  onSubmits2(){
    this.submitted2 = true;
    if( this.form2.invalid){
       return;
     } else {
       this.otp();
     }
   }
 
   async otp(){
    try{
      let response = await this.grafica_prodService.getCausasp(this.form2.value.causa, this.form.value.maquina, this.form.value.r1, this.form.value.r2, this.auth.token).toPromise();
      if ( response.code = 200){
        this.inft = response.response;
      } 
    }catch(error){
    }
   }


  get f() { return this.form.controls; }

  onSubmits(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }else{
      this.call();
    }
  }

  async call(){
    console.log(this.form.value.r1, this.form.value.r2);
    try{
      let response = await this.grafica_prodService.getConsulp(this.form.value.maquina, this.form.value.r1, this.form.value.r2, this.auth.token).toPromise();
      if(response.code = 200){
        this.mycall = response.response;

        ///stimer
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        let titulo = chart.titles.create();
        titulo.text = "[bold, font-size: 25px]Grafico Tiempo[/]";

        chart.cursor = new am4charts.XYCursor();

        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "descripcion";
        categoryAxis.title.text = "[bold, font-size: 25px]Alarma[/]"
        categoryAxis.renderer.minGridDistance = 1;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.disabled = true;
        
        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "[bold, font-size: 20px]tiempo total de encendido[/]"
        
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = "descripcion";
        series.dataFields.valueX = "tiempo";
        series.tooltipText = "{valueX.value}"
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        series.columns.template.column.cornerRadiusTopRight = 5;

        let labelBullet = series.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.horizontalCenter = "left";
        labelBullet.label.dx = 10;
        labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
        labelBullet.locationX = 1;
        
        series.columns.template.adapter.add("fill", function(fill, target){
          return chart.colors.getIndex(target.dataItem.index);
        });

        categoryAxis.sortBySeries = series;

        chart.data = this.mycall
        ///ftimer

        ///scant
        let charts = am4core.create("chartdivcantidad", am4charts.XYChart);
 
        let titulos = charts.titles.create();
        titulos.text = "[bold, font-size: 25px]Grafico Cantidad[/]";
       
        charts.cursor = new am4charts.XYCursor();
           
        let categoryAxiss = charts.yAxes.push(new am4charts.CategoryAxis());
        categoryAxiss.renderer.grid.template.location = 0;
        categoryAxiss.dataFields.category = "descripcion";
        categoryAxiss.title.text = "[bold, font-size: 25px]Alarma[/]"
        categoryAxiss.renderer.minGridDistance = 1;
        categoryAxiss.renderer.inversed = true;
        categoryAxiss.renderer.grid.template.disabled = true;
        
        let valueAxiss = charts.xAxes.push(new am4charts.ValueAxis());
        valueAxiss.min = 0;
        valueAxiss.title.text = "[bold, font-size: 20px]veces de encendida la alarma[/]"
        
        let seriess = charts.series.push(new am4charts.ColumnSeries());
        seriess.dataFields.categoryY = "descripcion";
        seriess.dataFields.valueX = "cantidad";
        seriess.tooltipText = "{valueX.value}"
        seriess.columns.template.strokeOpacity = 0;
        seriess.columns.template.column.cornerRadiusBottomRight = 5;
        seriess.columns.template.column.cornerRadiusTopRight = 5;
        
        let labelBullets = seriess.bullets.push(new am4charts.LabelBullet())
        labelBullets.label.horizontalCenter = "left";
        labelBullets.label.dx = 10;
        labelBullets.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
        labelBullets.locationX = 1;
        
        seriess.columns.template.adapter.add("fill", function(fill, target){
          return charts.colors.getIndex(target.dataItem.index);
        });
       
        categoryAxiss.sortBySeries = seriess;

        charts.data = this.mycall
        ///fcant
      }
    } catch (error) {
      
    } 
  }

  showData(){
    return (this.r1 = true, this.r2 = true, this.maquina = true);
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular( () => {
      if(this.chart){
        this.chart.dispose();
      }
    })
  }
}

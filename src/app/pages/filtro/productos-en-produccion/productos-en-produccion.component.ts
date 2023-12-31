import { Component, NgZone, OnInit, Input, Inject, OnDestroy } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { MaquinaService } from '@app/services/maquina.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { CardTitleComponent } from '@app/components/card-title/card-title.component';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-productos-en-produccion',
  templateUrl: './productos-en-produccion.component.html',
  styleUrls: ['./productos-en-produccion.component.scss'],
})

export class ProductosPrroduccionComponent implements OnInit {
  @Input() chartdiv: string;
  @Input() chartData;
  CG;
  Input: string;
  dataGauge = [];
  form: FormGroup;
  submitted = false;
  X = false;
  Z = false;
  token;
  data;
  Gaugue;
  calidad;
  score;
  title: string;

  constructor(
    private maquinaService: MaquinaService,
    private auth: AuthService,
  ) {

  }

  ngOnInit() {
    this.getMaquina();

    setInterval(() => {
      this.getMaquinas();
    }, 2000);
  }


  async getMaquinas() {
    try {
      let resp = await this.maquinaService.getMaquina(this.chartData, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.dataGauge = resp.maquina;
        this.score = this.dataGauge[0].oee;
        this.calidad = this.dataGauge[0].percent_calidad;
        this.score = Number(this.score) * 100;
        this.calidad = Number(this.calidad) * 100;
        
        if (this.chartdiv == 'chartdiv') {

          this.title = 'CALIDAD';
          this.CG = this.calidad;
        } else {
          this.title = 'OEE';
          this.CG = this.score;
        }

      }
    } catch (e) {
    }
  }

  async getMaquina() {
    try {
      let resp = await this.maquinaService.getMaquina(this.chartData, this.auth.token).toPromise();
      if (resp.code == 200) {
        this.dataGauge = resp.maquina;
        this.score = this.dataGauge[0].oee;
        this.calidad = this.dataGauge[0].percent_calidad;
        this.score = Number(this.score) * 100;
        this.calidad = Number(this.calidad) * 100;
        if(this.score == 0.00 || this.calidad == 0.00){
          this.score = 1;
          this.calidad = 1;
        }
        if (this.chartdiv == 'chartdiv') {
          this.title = 'CALIDAD';
          this.CG = this.calidad;
          this.Input = this.chartdiv;
          this.c(this.CG, this.Input, this.title)
        } else {
          this.title = 'OEE';
          this.CG = this.score;
          this.Input = this.chartdiv;
          this.g(this.CG, this.Input, this.title)
        }
        this.token = this.auth.token;
      }
    } catch (e) {
    }
  }

  g(score, chartdiv: string, titulo: string) {
   // console.log(this.CG)
    score = this.CG;
    let chartMin = 0;
    let chartMax = 120;
    let data2 = {
      score: score,
      gradingData: [
        {
          title: "Bajo",
          color: "#ee1f25",
          lowScore: 0,
          highScore: 80
        },
        {
          title: "Medio",
          color: "#f3eb0c",
          lowScore: 80,
          highScore: 90
        },
        {
          title: "Alto",
          color: "#00ff00",
          lowScore: 90,
          highScore: 120
        }
      ]
    };

    function lookUpGrade(lookupScore, grades) {
      // Only change code below this line
      for (var i = 0; i < grades.length; i++) {
        if (
          grades[i].lowScore < lookupScore &&
          grades[i].highScore >= lookupScore
        ) {
          return grades[i];
        }
      }
      return null;
    }

    let chart = am4core.create(chartdiv, am4charts.GaugeChart);
    chart.hiddenState.properties.opacity = -10;
    chart.fontSize = 11;
    chart.innerRadius = am4core.percent(80);
    chart.resizable = true;
    //   let title = chart.titles.create();
    //  title.text = titulo;
    // title.fill = am4core.color("#FFF");
    // title.fontSize = "2em";

    let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis.min = chartMin;
    axis.max = chartMax;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 0.1;
    axis.renderer.ticks.template.disabled = false;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.strokeWidth = 0.5;
    axis.renderer.ticks.template.length = 5;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = am4core.percent(15);
    axis.renderer.labels.template.fill = am4core.color("#FFF");
    axis.renderer.labels.template.fontSize = "0.9em";

    let axis2 = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis2.min = chartMin;
    axis2.max = chartMax;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = false;
    axis2.renderer.grid.template.opacity = 0.5;
    axis2.renderer.labels.template.bent = true;
    axis2.renderer.labels.template.fill = am4core.color("#FFF");
    axis2.renderer.labels.template.fontWeight = "bold";
    axis2.renderer.labels.template.fillOpacity = 0.3;



    /**
    Ranges
    */

    for (let grading of data2.gradingData) {
      let range = axis2.axisRanges.create();
      range.axisFill.fill = am4core.color(grading.color);
      range.axisFill.fillOpacity = 0.8;
      range.axisFill.zIndex = -1;
      range.value = grading.lowScore > chartMin ? grading.lowScore : chartMin;
      range.endValue = grading.highScore < chartMax ? grading.highScore : chartMax;
      range.grid.strokeOpacity = 0;
      //range.label = am4core.color(grading.color).lighten(-0.1);
      range.label.inside = true;
      range.label.text = grading.title.toUpperCase();
      range.label.inside = true;
      range.label.location = 0.5;
      range.label.inside = true;
      //range.label.radius = am4core.percent(10);
      range.label.paddingBottom = -5; // ~half font size
      range.label.fontSize = "0.9em";
      range.label.fill = am4core.color("#FFF");
    }

    let matchingGrade = lookUpGrade(data2.score, data2.gradingData);

    /**
     * Label 1
     */

    let label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = "6em";
    label.x = am4core.percent(50);
    label.paddingBottom = 15;
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    //label.dataItem = data;
    // label.text = data.score.toFixed(2);
    //label.text = "{score}";
    label.fill = am4core.color(matchingGrade.color);

    /**
     * Label 2
     */

    let label2 = chart.radarContainer.createChild(am4core.Label);
    label2.isMeasured = false;
    label2.fontSize = "2em";
    label2.horizontalCenter = "middle";
    label2.verticalCenter = "bottom";
    label2.text = matchingGrade.title.toUpperCase();
    label2.fill = am4core.color(matchingGrade.color);


    /**
     * Hand
     */

    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent(55);
    hand.startWidth = 8;
    hand.pin.disabled = true;
    hand.value = data2.score;
    hand.fill = am4core.color("#FFF");
    hand.stroke = am4core.color("#FFF");

    hand.events.on("positionchanged", function () {
      label.text = axis2.positionToValue(hand.currentPosition).toFixed();
      let value2 = axis.positionToValue(hand.currentPosition);
      let matchingGrade = lookUpGrade(axis.positionToValue(hand.currentPosition), data2.gradingData);
     /* label2.text = matchingGrade.title.toUpperCase();
      label2.fill = am4core.color(matchingGrade.color);
      label2.stroke = am4core.color(matchingGrade.color);
      label.fill = am4core.color(matchingGrade.color); */
    })

    setInterval(() => {
      //let value = chartMin + Math.random() * (chartMax - chartMin);
      this.getMaquinas();
      let value = this.CG;
      hand.showValue(value, 1000, am4core.ease.cubicOut);
    }, 5000);


    //  })
  }

  c(score, chartdiv: string, titulo: string) {
    // this.zone.runOutsideAngular(() => {

    score = this.CG;
    let chartMin = 0;
    let chartMax = 100;
    let data = {
      score: score,
      gradingData: [
        {
          title: "Bajo",
          color: "#ee1f25",
          lowScore: 0,
          highScore: 90
        },
        {
          title: "Medio",
          color: "#f3eb0c",
          lowScore: 90,
          highScore: 96
        },
        {
          title: "Alto",
          color: "#00ff00",
          lowScore: 96,
          highScore: 100
        }
      ]
    };

    function lookUpGrade(lookupScore, grades) {
      // Only change code below this line
      for (var i = 0; i < grades.length; i++) {
        if (
          grades[i].lowScore < lookupScore &&
          grades[i].highScore >= lookupScore
        ) {
          return grades[i];
        }
      }
      return null;
    }

    let chart = am4core.create(chartdiv, am4charts.GaugeChart);
    chart.hiddenState.properties.opacity = 0;
    chart.fontSize = 11;
    chart.innerRadius = am4core.percent(80);
    chart.resizable = true;
    //   let title = chart.titles.create();
    //  title.text = titulo;
    // title.fill = am4core.color("#FFF");
    // title.fontSize = "2em";

    let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis.min = chartMin;
    axis.max = chartMax;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 0.1;
    axis.renderer.ticks.template.disabled = false;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.strokeWidth = 0.5;
    axis.renderer.ticks.template.length = 5;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = am4core.percent(15);
    axis.renderer.labels.template.fill = am4core.color("#FFF");
    axis.renderer.labels.template.fontSize = "0.9em";

    let axis2 = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis2.min = chartMin;
    axis2.max = chartMax;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = false;
    axis2.renderer.grid.template.opacity = 0.5;
    axis2.renderer.labels.template.bent = true;
    axis2.renderer.labels.template.fill = am4core.color("#FFF");
    axis2.renderer.labels.template.fontWeight = "bold";
    axis2.renderer.labels.template.fillOpacity = 0.3;



    /**
    Ranges
    */

    for (let grading of data.gradingData) {
      let range = axis2.axisRanges.create();
      range.axisFill.fill = am4core.color(grading.color);
      range.axisFill.fillOpacity = 0.8;
      range.axisFill.zIndex = -1;
      range.value = grading.lowScore > chartMin ? grading.lowScore : chartMin;
      range.endValue = grading.highScore < chartMax ? grading.highScore : chartMax;
      range.grid.strokeOpacity = 0;
      //range.label = am4core.color(grading.color).lighten(-0.1);
      range.label.inside = true;
      range.label.text = grading.title.toUpperCase();
      range.label.inside = true;
      range.label.location = 0.5;
      range.label.inside = true;
      //range.label.radius = am4core.percent(10);
      range.label.paddingBottom = -5; // ~half font size
      range.label.fontSize = "0.9em";
      range.label.fill = am4core.color("#FFF");
    }

    let matchingGrade = lookUpGrade(data.score, data.gradingData);

    /**
     * Label 1
     */

    let label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = "6em";
    label.x = am4core.percent(50);
    label.paddingBottom = 15;
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    //label.dataItem = data;
    // label.text = data.score.toFixed(2);
    //label.text = "{score}";
    label.fill = am4core.color(matchingGrade.color);

    /**
     * Label 2
     */

    let label2 = chart.radarContainer.createChild(am4core.Label);
    label2.isMeasured = false;
    label2.fontSize = "2em";
    label2.horizontalCenter = "middle";
    label2.verticalCenter = "bottom";
    label2.text = matchingGrade.title.toUpperCase();
    label2.fill = am4core.color(matchingGrade.color);


    /**
     * Hand
     */

    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent(55);
    hand.startWidth = 8;
    hand.pin.disabled = true;
    hand.value = data.score;
    hand.fill = am4core.color("#FFF");
    hand.stroke = am4core.color("#FFF");

    hand.events.on("positionchanged", function () {
      label.text = axis2.positionToValue(hand.currentPosition).toFixed(0);
      let value2 = axis.positionToValue(hand.currentPosition);
      let matchingGrade = lookUpGrade(axis.positionToValue(hand.currentPosition), data.gradingData);
    /* label2.text = matchingGrade.title.toUpperCase();
      label2.fill = am4core.color(matchingGrade.color);
      label2.stroke = am4core.color(matchingGrade.color);
      label.fill = am4core.color(matchingGrade.color);*/
    })

    setInterval(() => {
      //let value = chartMin + Math.random() * (chartMax - chartMin);
      this.getMaquinas();
      let value = this.CG;
      hand.showValue(value, 1000, am4core.ease.cubicOut);
    }, 5000);


    //  })
  }


}

import { Directive, OnInit, ElementRef } from '@angular/core';

import 'script-loader!smartadmin-plugins/bower_components/relayfoods-jquery.sparkline/dist/jquery.sparkline.min.js'

declare var $: any;

@Directive({
  selector: '[saSparklineContainer]'
})
export class SparklineContainer implements OnInit {

  container: any;

  constructor(private el: ElementRef) {
    this.container = this.el.nativeElement;
  }

  ngOnInit() {
    this.drawSparklines();
  }

  barChart($el: any) {
    const barColor = $el.data('sparkline-bar-color') || $el.css('color') || '#0000f0';
    const sparklineHeight = $el.data('sparkline-height') || '26px';
    const sparklineBarWidth = $el.data('sparkline-barwidth') || 5;
    const sparklineBarSpacing = $el.data('sparkline-barspacing') || 2;
    const sparklineNegBarColor = $el.data('sparkline-negbar-color') || '#A90329';
    const sparklineStackedColor = $el.data('sparkline-barstacked-color') ||
      ['#A90329', '#0099c6', '#98AA56', '#da532c', '#4490B1', '#6E9461', '#990099', '#B4CAD3'];

    $el.sparkline('html', {
      barColor: barColor,
      type: 'bar',
      height: sparklineHeight,
      barWidth: sparklineBarWidth,
      barSpacing: sparklineBarSpacing,
      stackedBarColor: sparklineStackedColor,
      negBarColor: sparklineNegBarColor,
      zeroAxis: 'false',
      tooltipContainer: this.container
    });
  }

  lineChart($el: any) {

    const sparklineHeight = $el.data('sparkline-height') || '20px';
    const sparklineWidth = $el.data('sparkline-width') || '90px';
    const thisLineColor = $el.data('sparkline-line-color') || $el.css('color') || '#0000f0';
    const thisLineWidth = $el.data('sparkline-line-width') || 1;
    const thisFill = $el.data('fill-color') || '#c0d0f0';
    const thisSpotColor = $el.data('sparkline-spot-color') || '#f08000';
    const thisMinSpotColor = $el.data('sparkline-minspot-color') || '#ed1c24';
    const thisMaxSpotColor = $el.data('sparkline-maxspot-color') || '#f08000';
    const thishighlightSpotColor = $el.data('sparkline-highlightspot-color') || '#50f050';
    const thisHighlightLineColor = $el.data('sparkline-highlightline-color') || 'f02020';
    const thisSpotRadius = $el.data('sparkline-spotradius') || 1.5;
    const thisChartMinYRange = $el.data('sparkline-min-y');
    const thisChartMaxYRange = $el.data('sparkline-max-y');
    const thisChartMinXRange = $el.data('sparkline-min-x');
    const thisChartMaxXRange = $el.data('sparkline-max-x');
    const thisMinNormValue = $el.data('min-val');
    const thisMaxNormValue = $el.data('max-val');
    const thisNormColor = $el.data('norm-color') || '#c0c0c0';
    const thisDrawNormalOnTop = $el.data('draw-normal') || false;

    $el.sparkline('html', {
      type: 'line',
      width: sparklineWidth,
      height: sparklineHeight,
      lineWidth: thisLineWidth,
      lineColor: thisLineColor,
      fillColor: thisFill,
      spotColor: thisSpotColor,
      minSpotColor: thisMinSpotColor,
      maxSpotColor: thisMaxSpotColor,
      highlightSpotColor: thishighlightSpotColor,
      highlightLineColor: thisHighlightLineColor,
      spotRadius: thisSpotRadius,
      chartRangeMin: thisChartMinYRange,
      chartRangeMax: thisChartMaxYRange,
      chartRangeMinX: thisChartMinXRange,
      chartRangeMaxX: thisChartMaxXRange,
      normalRangeMin: thisMinNormValue,
      normalRangeMax: thisMaxNormValue,
      normalRangeColor: thisNormColor,
      drawNormalOnTop: thisDrawNormalOnTop,
      tooltipContainer: this.container

    });
  }

  pieChart($el) {
    const pieColors = $el.data('sparkline-piecolor')
      || ['#B4CAD3', '#4490B1', '#98AA56', '#da532c', '#6E9461', '#0099c6', '#990099', '#717D8A'];
    const pieWidthHeight = $el.data('sparkline-piesize') || 90;
    const pieBorderColor = $el.data('border-color') || '#45494C';
    const pieOffset = $el.data('sparkline-offset') || 0;

    $el.sparkline('html', {
      type: 'pie',
      width: pieWidthHeight,
      height: pieWidthHeight,
      tooltipFormat: '<span style="color: {{color}}">&#9679;</span> ({{percent.1}}%)',
      sliceColors: pieColors,
      borderWidth: 1,
      offset: pieOffset,
      borderColor: pieBorderColor,
      tooltipContainer: this.container
    });
  }

  boxChart($el) {
    const thisBoxWidth = $el.data('sparkline-width') || 'auto';
    const thisBoxHeight = $el.data('sparkline-height') || 'auto';
    const thisBoxRaw = $el.data('sparkline-boxraw');
    const thisBoxTarget = $el.data('sparkline-targetval');
    const thisBoxMin = $el.data('sparkline-min');
    const thisBoxMax = $el.data('sparkline-max');
    const thisShowOutlier = $el.data('sparkline-showoutlier') || true;
    const thisIQR = $el.data('sparkline-outlier-iqr') || 1.5;
    const thisBoxSpotRadius = $el.data('sparkline-spotradius') || 1.5;
    const thisBoxLineColor = $el.css('color') || '#000000';
    const thisBoxFillColor = $el.data('fill-color') || '#c0d0f0';
    const thisBoxWhisColor = $el.data('sparkline-whis-color') || '#000000';
    const thisBoxOutlineColor = $el.data('sparkline-outline-color') || '#303030';
    const thisBoxOutlineFill = $el.data('sparkline-outlinefill-color') || '#f0f0f0';
    const thisBoxMedianColor = $el.data('sparkline-outlinemedian-color') || '#f00000';
    const thisBoxTargetColor = $el.data('sparkline-outlinetarget-color') || '#40a020';

    $el.sparkline('html', {
      type: 'box',
      width: thisBoxWidth,
      height: thisBoxHeight,
      raw: thisBoxRaw,
      target: thisBoxTarget,
      minValue: thisBoxMin,
      maxValue: thisBoxMax,
      showOutliers: thisShowOutlier,
      outlierIQR: thisIQR,
      spotRadius: thisBoxSpotRadius,
      boxLineColor: thisBoxLineColor,
      boxFillColor: thisBoxFillColor,
      whiskerColor: thisBoxWhisColor,
      outlierLineColor: thisBoxOutlineColor,
      outlierFillColor: thisBoxOutlineFill,
      medianColor: thisBoxMedianColor,
      targetColor: thisBoxTargetColor,
      tooltipContainer: this.container

    });
  }

  bulletChart($el) {
    const thisBulletHeight = $el.data('sparkline-height') || 'auto';
    const thisBulletWidth = $el.data('sparkline-width') || 2;
    const thisBulletColor = $el.data('sparkline-bullet-color') || '#ed1c24';
    const thisBulletPerformanceColor = $el.data('sparkline-performance-color') || '#3030f0';
    const thisBulletRangeColors = $el.data('sparkline-bulletrange-color') || ['#d3dafe', '#a8b6ff', '#7f94ff'];

    $el.sparkline('html', {

      type: 'bullet',
      height: thisBulletHeight,
      targetWidth: thisBulletWidth,
      targetColor: thisBulletColor,
      performanceColor: thisBulletPerformanceColor,
      rangeColors: thisBulletRangeColors,
      tooltipContainer: this.container

    });
  }

  discreteChart($el) {
    const thisDiscreteHeight = $el.data('sparkline-height') || 26;
    const thisDiscreteWidth = $el.data('sparkline-width') || 50;
    const thisDiscreteLineColor = $el.css('color');
    const thisDiscreteLineHeight = $el.data('sparkline-line-height') || 5;
    const thisDiscreteThrushold = $el.data('sparkline-threshold');
    const thisDiscreteThrusholdColor = $el.data('sparkline-threshold-color') || '#ed1c24';

    $el.sparkline('html', {
      type: 'discrete',
      width: thisDiscreteWidth,
      height: thisDiscreteHeight,
      lineColor: thisDiscreteLineColor,
      lineHeight: thisDiscreteLineHeight,
      thresholdValue: thisDiscreteThrushold,
      thresholdColor: thisDiscreteThrusholdColor,
      tooltipContainer: this.container
    });
  }

  tristaneChart($el) {
    const thisTristateHeight = $el.data('sparkline-height') || 26;
    const thisTristatePosBarColor = $el.data('sparkline-posbar-color') || '#60f060';
    const thisTristateNegBarColor = $el.data('sparkline-negbar-color') || '#f04040';
    const thisTristateZeroBarColor = $el.data('sparkline-zerobar-color') || '#909090';
    const thisTristateBarWidth = $el.data('sparkline-barwidth') || 5;
    const thisTristateBarSpacing = $el.data('sparkline-barspacing') || 2;
    const thisZeroAxis = $el.data('sparkline-zeroaxis');

    $el.sparkline('html', {
      type: 'tristate',
      height: thisTristateHeight,
      posBarColor: thisTristatePosBarColor,
      negBarColor: thisTristateNegBarColor,
      zeroBarColor: thisTristateZeroBarColor,
      barWidth: thisTristateBarWidth,
      barSpacing: thisTristateBarSpacing,
      zeroAxis: thisZeroAxis,
      tooltipContainer: this.container
    });
  }

  compositeBarChart($el) {
    const sparklineHeight = $el.data('sparkline-height') || '20px';
    const sparklineWidth = $el.data('sparkline-width') || '100%';
    const sparklineBarWidth = $el.data('sparkline-barwidth') || 3;
    const thisLineWidth = $el.data('sparkline-line-width') || 1;
    const thisLineColor = $el.data('sparkline-color-top') || '#ed1c24';
    const thisBarColor = $el.data('sparkline-color-bottom') || '#333333';

    $el.sparkline($el.data('sparkline-bar-val'), {
      type: 'bar',
      width: sparklineWidth,
      height: sparklineHeight,
      barColor: thisBarColor,
      barWidth: sparklineBarWidth,
      tooltipContainer: this.container
      // barSpacing: 5
    });

    $el.sparkline($el.data('sparkline-line-val'), {
      width: sparklineWidth,
      height: sparklineHeight,
      lineColor: thisLineColor,
      lineWidth: thisLineWidth,
      composite: true,
      fillColor: false,
      tooltipContainer: this.container
    });
  }

  compositeLineChart($el) {

    // @todo webpack gets stuck on chunk optimization if uncomment defaults

    const sparklineHeight = $el.data('sparkline-height') // || '20px';
    const sparklineWidth = $el.data('sparkline-width')  // || '90px';
    const sparklineValue = $el.data('sparkline-bar-val');
    const sparklineValueSpots1 = $el.data('sparkline-bar-val-spots-top');
    const sparklineValueSpots2 = $el.data('sparkline-bar-val-spots-bottom');
    const thisLineWidth1 = $el.data('sparkline-line-width-top') //  || 1;
    const thisLineWidth2 = $el.data('sparkline-line-width-bottom')  // || 1;
    const thisLineColor1 = $el.data('sparkline-color-top') //  || '#333333';
    const thisLineColor2 = $el.data('sparkline-color-bottom') //  || '#ed1c24';
    const thisSpotRadius1 = $el.data('sparkline-spotradius-top')  // || 1.5;
    const thisSpotRadius2 = $el.data('sparkline-spotradius-bottom')  // || thisSpotRadius1;
    const thisSpotColor = $el.data('sparkline-spot-color')  // || '#f08000';
    const thisMinSpotColor1 = $el.data('sparkline-minspot-color-top')  // || '#ed1c24';
    const thisMaxSpotColor1 = $el.data('sparkline-maxspot-color-top') //  || '#f08000';
    const thisMinSpotColor2 = $el.data('sparkline-minspot-color-bottom')  // || thisMinSpotColor1;
    const thisMaxSpotColor2 = $el.data('sparkline-maxspot-color-bottom') //  || thisMaxSpotColor1;
    const thishighlightSpotColor1 = $el.data('sparkline-highlightspot-color-top') //  || '#50f050';
    const thisHighlightLineColor1 = $el.data('sparkline-highlightline-color-top')  // || '#f02020';
    const thishighlightSpotColor2 = $el.data('sparkline-highlightspot-color-bottom')  // || thishighlightSpotColor1;
    const thisHighlightLineColor2 = $el.data('sparkline-highlightline-color-bottom')  // || thisHighlightLineColor1;
    const thisFillColor1 = $el.data('sparkline-fillcolor-top')  // || 'transparent';
    const thisFillColor2 = $el.data('sparkline-fillcolor-bottom')  // || 'transparent';

    $el.sparkline(sparklineValue, {

      type: 'line',
      spotRadius: thisSpotRadius1,

      spotColor: thisSpotColor,
      minSpotColor: thisMinSpotColor1,
      maxSpotColor: thisMaxSpotColor1,
      highlightSpotColor: thishighlightSpotColor1,
      highlightLineColor: thisHighlightLineColor1,

      valueSpots: sparklineValueSpots1,

      lineWidth: thisLineWidth1,
      width: sparklineWidth,
      height: sparklineHeight,
      lineColor: thisLineColor1,
      fillColor: thisFillColor1,
      tooltipContainer: this.container

    });

    $el.sparkline($el.data('sparkline-line-val'), {

      type: 'line',
      spotRadius: thisSpotRadius2,

      spotColor: thisSpotColor,
      minSpotColor: thisMinSpotColor2,
      maxSpotColor: thisMaxSpotColor2,
      highlightSpotColor: thishighlightSpotColor2,
      highlightLineColor: thisHighlightLineColor2,

      valueSpots: sparklineValueSpots2,

      lineWidth: thisLineWidth2,
      width: sparklineWidth,
      height: sparklineHeight,
      lineColor: thisLineColor2,
      composite: true,
      fillColor: thisFillColor2,
      tooltipContainer: this.container

    });

  }

  drawSparklines() {
    $('.sparkline:not(:has(>canvas))', this.container).each((i, el) => {
      const $el = $(el),
        sparklineType = $el.data('sparkline-type') || 'bar';

      if (sparklineType === 'bar') {
        this.barChart($el)
      }

      if (sparklineType === 'line') {
        this.lineChart($el)
      }

      if (sparklineType === 'pie') {
        this.pieChart($el)
      }

      if (sparklineType === 'box') {
        this.boxChart($el)
      }

      if (sparklineType === 'bullet') {
        this.bulletChart($el)
      }

      if (sparklineType === 'discrete') {
        this.discreteChart($el)
      }

      if (sparklineType === 'tristate') {
        this.tristaneChart($el)
      }

      if (sparklineType === 'compositebar') {
        this.compositeBarChart($el)
      }

      if (sparklineType === 'compositeline') {
        this.compositeLineChart($el)
      }

    });
  }
}

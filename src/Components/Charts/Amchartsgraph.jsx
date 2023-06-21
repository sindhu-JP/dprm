import React from 'react';

import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { useLingui } from '@lingui/react';
export default function Amchartsgraph({ data, ThemeType }) {
  const { i18n } = useLingui();
  const [partnerName, setPartnerName] = React.useState('Partner Name');
  const [productSold, setProductSold] = React.useState('Partner Name');

  const partnerNameValue = i18n.t`Partner Name`;
  const productSoldValue = i18n.t`Product Sold`;

  React.useEffect(() => {
    if (data) {
      am4core.useTheme(am4themes_animated);
      // am4core.useTheme(am4themes_kelly);

      // const partnerName = <Trans id="Partner Name"></Trans>;
      // const productSold = <Trans id="Product Sold"></Trans>;

      // Create chart instance
      let chart = am4core.create('chartdiv', am4charts.XYChart);
      if (chart.logo) {
        chart.logo.disabled = true;
      }
      chart.background.fill = ThemeType === 'dark' ? '#555' : '#fff';

      chart.padding(40, 40, 40, 40);

      let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.dataFields.category = 'network';
      categoryAxis.renderer.minGridDistance = 1;
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.disabled = true;

      categoryAxis.title.text = partnerNameValue;
      categoryAxis.title.paddingTop = 40;
      categoryAxis.title.rotation = 270;
      categoryAxis.title.align = 'center';
      categoryAxis.title.fontWeight = 600;

      let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;

      valueAxis.title.text = productSoldValue;
      valueAxis.title.rotation = 0;
      valueAxis.title.align = 'center';
      valueAxis.title.fontWeight = 600;

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryY = 'network';
      series.dataFields.valueX = 'value';
      // series.tooltipText = '{valueX.value}';
      series.columns.template.strokeOpacity = 0;
      series.columns.template.column.cornerRadiusBottomRight = 5;
      series.columns.template.column.cornerRadiusTopRight = 5;
      series.tooltipText = '{network}: [bold]{valueX.value}[/]';
      // This has no effect

      series.stacked = true;
      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.horizontalCenter = 'left';
      labelBullet.label.dx = 10;
      // labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#')}";
      labelBullet.locationX = 1;
      // var valueLabel = series.bullets.push(new am4charts.LabelBullet());
      // valueLabel.label.text = "{value}";
      // valueLabel.label.fontSize = 20;
      // valueLabel.label.horizontalCenter = "left";
      series.columns.template.adapter.add('fill', function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
      });
      chart.data = data;
      // Add cursor
      chart.cursor = new am4charts.XYCursor();

      // Add legend
      // chart.legend = new am4charts.Legend();
    }
  }, [data, ThemeType]);
  // useEffect(() => {

  //    if(data){

  //   am5.ready(function() {

  //   // Create root element
  //   // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  //   var root = am5.Root.new("chartdiv");

  //   // if (root.logo) {
  //   //               root. = true;
  //   //             }
  //   // Set themes
  //   // https://www.amcharts.com/docs/v5/concepts/themes/
  //   root.setThemes([
  //     am5themes_Animated.new(root)
  //   ]);

  //   // Create chart
  //   // https://www.amcharts.com/docs/v5/charts/xy-chart/
  //   var chart = root.container.children.push(am5xy.XYChart.new(root, {
  //     panX: false,
  //     panY: false,
  //     wheelX: "none",
  //     wheelY: "none"
  //   }));

  //   // We don't want zoom-out button to appear while animating, so we hide it
  //   chart.zoomOutButton.set("forceHidden", true);

  //   // Create axes
  //   // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  //   var yRenderer = am5xy.AxisRendererY.new(root, {
  //     minGridDistance: 30
  //   });

  //   var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  //     maxDeviation: 0,
  //     categoryField: "network",
  //     renderer: yRenderer,
  //     tooltip: am5.Tooltip.new(root, { themeTags: ["axis"] })
  //   }));

  //   var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  //     maxDeviation: 0,
  //     min: 0,
  //     extraMax:0.1,
  //     renderer: am5xy.AxisRendererX.new(root, {})
  //   }));

  //   // Add series
  //   // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  //   var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  //     name: "network",
  //     xAxis: xAxis,
  //     yAxis: yAxis,
  //     valueXField: "value",
  //     categoryYField: "network",

  //     tooltip: am5.Tooltip.new(root, {
  //       pointerOrientation: "left",
  //       labelText: "{valueX}"
  //     })
  //   }));
  //   // series.dataFields.categoryY = 'leadstatus';
  //   // series.dataFields.valueX = 'count';

  //   // Rounded corners for columns
  //   series.columns.template.setAll({
  //     cornerRadiusTR: 5,
  //     cornerRadiusBR: 5
  //   });

  //   // Make each column to be of a different color
  //   series.columns.template.adapters.add("fill", function(fill, target) {
  //     return chart.get("colors").getIndex(series.columns.indexOf(target));
  //   });

  //   series.columns.template.adapters.add("stroke", function(stroke, target) {
  //     return chart.get("colors").getIndex(series.columns.indexOf(target));
  //   });

  //   yAxis.data.setAll(data);
  //   series.data.setAll(data);
  //   sortCategoryAxis();

  //   // Get series item by category
  //   function getSeriesItem(category) {
  //     for (var i = 0; i < series.dataItems.length; i++) {
  //       var dataItem = series.dataItems[i];
  //       if (dataItem.get("categoryY") == category) {
  //         return dataItem;
  //       }
  //     }
  //   }

  //   chart.set("cursor", am5xy.XYCursor.new(root, {
  //     behavior: "none",
  //     xAxis: xAxis,
  //     yAxis: yAxis
  //   }));

  //   // Axis sorting
  //   function sortCategoryAxis() {

  //     // Sort by value
  //     series.dataItems.sort(function(x, y) {
  //       return x.get("valueX") - y.get("valueX"); // descending
  //       //return y.get("valueY") - x.get("valueX"); // ascending
  //     })

  //     // Go through each axis item
  //     am5.array.each(yAxis.dataItems, function(dataItem) {
  //       // get corresponding series item
  //       var seriesDataItem = getSeriesItem(dataItem.get("category"));

  //       if (seriesDataItem) {
  //         // get index of series data item
  //         var index = series.dataItems.indexOf(seriesDataItem);
  //         // calculate delta position
  //         var deltaPosition = (index - dataItem.get("index", 0)) / series.dataItems.length;
  //         // set index to be the same as series data item index
  //         dataItem.set("index", index);
  //         // set deltaPosition instanlty
  //         dataItem.set("deltaPosition", -deltaPosition);
  //         // animate delta position to 0
  //         dataItem.animate({
  //           key: "deltaPosition",
  //           to: 0,
  //           duration: 100,
  //           easing: am5.ease.out(am5.ease.cubic)
  //         })
  //       }
  //     });

  //     // Sort axis items by index.
  //     // This changes the order instantly, but as deltaPosition is set,
  //     // they keep in the same places and then animate to true positions.
  //     yAxis.dataItems.sort(function(x, y) {
  //       return x.get("index") - y.get("index");
  //     });
  //   }

  //   // update data with random values each 1.5 sec
  //   // setInterval(function () {
  //   //   // updateData();
  //   // }, 1500)

  //   // series.appear(1000);
  //   // chart.appear(1000, 100);

  //   })
  //   {/* </script> */}

  //    }
  // }, [data]);
  return (
    <div>
      <div
        dir="ltr"
        id="chartdiv"
        style={{ width: '100%', height: '440px' ,right:'20px',position:'relative'}}
      ></div>
    </div>
  );
}

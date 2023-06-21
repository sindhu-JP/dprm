import jsPDF from 'jspdf';
import 'jspdf-autotable';
const genarateDocument = (data) => {
  let temp = [];
  _.map(data, (item) => {
    temp.push(item.pdflist);
  });

  return temp;
};
const exportPDF = ({ name, pdfdata, headersdata, subformatlist }) => {
  const unit = 'pt';
  const size = subformatlist;
  const orientation = 'portrait';
  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);

  doc.setFontSize(15);

  const title = name;
  const headers = [_.map(headersdata, 'label')];

  // const data = people.map(elt=> [elt.name, elt.profession]);

  let content = {
    startY: 50,
    head: headers,
    headStyles: { fillColor: '#ffcc00' },
    // theme:'grid',
    styles: { textColor: 'black', font: 'BrighterSansRegular' },
    body: genarateDocument(pdfdata)
  };

  // doc.text(title, marginLeft, 40);
  // doc.autoTable(content);

  const base64Img =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAlCAMAAADyQNAxAAABwlBMVEUAZ48BaI4CaI4EaZEFapEGZYwIaosKa4kMbIgNbIgNb5UObIcPcJYSboUScpcUb4QUc5ghdHwidHwie54jdXsjfJ4kdXslWHopf6EsgaIteXYueXUwenQwhKQxenQ1h6Y7fm48f209f209i6o+gGw+jKpCgWpIkq9MlLBNlbFRl7NWmrVXil5Xm7VYiV5Zil1ai11cjFtdi1tejFpjP1djjldkj1dlo7tmpLxnpLxrp75tqL91rcJ3e017sMV8scV+mUh/mkiBckeBmkeDm0aEnEWFm0SGnESGt8qJnkKJucuKucyLoEiPvM6QoD6Qvc6Tv9CZozmZwtKapDmbw9OfpjagpjWhpzWkqDOnqjGqIjCqqjCqzNqtqy6uz9uyrSuy0d2zriuz0t60riq00t61rym209+31N+41eC61uG71uG81+LA2ePFtSHG3ebJ3+fK3+jM4enN4enP4urUuxjWvBfXvBbYvRbZvRXcvhTdvxPevxPf7PHhwBHrxAvtxQruxQrv9fjw9vjy9/n0xwb0+Pr1yAb1+fv3+vv4yQT6/P37/f38/f79/v7+/v//zAD/9cz/+uX//fX//vr///3////j0cf+AAAAAWJLR0SVCGB6gwAAAUVJREFUOMtjmEoMYJg6ZSIhMBmoamI/ITBhVBWtVdXFOxgqCPFyMHDwiigaOSbWYaqqdJFiQAfSrpUoqkp1mBiwASa9MoSqQDagCE9MjAVDQEyIWTQQeHrEyArH6DIwsAXDVIWC9WlMnRqkPHVqUmxtf2eVT8dUO6upmiDxMIiqFk6wKu+pXUFxXVNtGNT6IxhUp05Ni+vlA4lzt4FVlUDcUNCbl9WTP1WewaXflMF+ak1TYzFEogRiFjeIzdVdlNBXkNPMzJDbL8iQ3WE9dao/A5JZ/ZEgjvpUr4Sp2u3pDKxOtgwsrZmiU6dqgVWFw/wYzs7AYFmo6psiWWjOIB5lwiBRaMGQUSgAVMPmhwivcn0c4WVQgRL2VW4yjGhKGOXcqzHjsT7Z2VhJjB8Yj/xiKsbOqQ2j6X5wqJo8gRCYBFRFDAAA1MZ7/+dkm1AAAAAASUVORK5CYII=';
  var totalPagesExp = '{total_pages_count_string}';
  doc.autoTable({
    ...content,
    didDrawPage: function (data) {
      // Header

      if (base64Img) {
        doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 5, 25, 25);
      }

      //doc.text('reports', 35, 22);
      doc.text(name?.props?.id, data?.settings?.margin?.left + 35, 22);


      // Footer
      var str = 'Page ' + doc.internal.getNumberOfPages();
      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === 'function') {
        str = str + ' of ' + totalPagesExp;
      }
      doc.setFontSize(10);

      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 20);
    },
    margin: { top: 40 }
  });

  // Total page number plugin only available in jspdf v1.0+
  if (typeof doc.putTotalPages === 'function') {
    doc.putTotalPages(totalPagesExp);
  }

  // return doc;

  doc.save(`${name.props.id}.pdf`);
};

export default { exportPDF, genarateDocument };

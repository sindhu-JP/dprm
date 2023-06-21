import React from 'react';


const helpPageUrl =
  ('/digital-prm-web-ui' || '%PUBLIC_URL%') + '/help/index.htm';

export default function Help() {
  return (
    <iframe
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0
      }}
      src={helpPageUrl}
    />
  );
}















// import htmlFile from '../../HtmlFile/htmlFile.html';

// function Help() {
//   return (
//     <iframe src={htmlFile} />
//   );
// }

// export default Help;
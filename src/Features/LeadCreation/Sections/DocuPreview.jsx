import React, { useState, useCallback, useEffect } from 'react';
import config from 'config';

import { Trans } from '@lingui/react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Document, Page } from 'react-pdf';
import { getaccessToken } from 'Http/axios';
import _ from 'lodash';

const PdfPreview = ({ path, autoWidth }) => {
  const [width, setWidth] = useState(autoWidth ? 'auto' : 150);

  const div = useCallback((node) => {
    if (node !== null && !autoWidth) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div ref={div}>
      <Document
        file={{
          url: path,
          httpHeaders: { Authorization: `Bearer ${getaccessToken()}` }
        }}
      >
        <Page pageNumber={1} width={width} scale={1} />
      </Document>
    </div>
  );
};

const styles = () => ({
  img: {
    width: '100%'
  }
});

const { apiConfig } = config.dev;

const DocumentPreview = ({ documentId, attachment, classes, path }) => {
  const [src, setSrc] = useState(null);

  //   const { href } = apiConfig[constants.configType.DOCUMENT_MANAGEMENT];
  //   const path = `${href}/download/${documentId}`;

  useEffect(() => {
    if (documentId && /^image/i.test(_.get(attachment, '[0].mimeType', ''))) {
      fetch(path, {
        headers: { Authorization: `Bearer ${getaccessToken()}` }
      }).then((res) => {
        if (res.ok) {
          res.blob().then((b) => {
            // Start loading the image:
            let src = URL.createObjectURL(b);
            setSrc(src);
          });
        }
      });
    }
  }, [documentId, attachment]);

  if (_.get(attachment, '[0].mimeType', '') === 'application/pdf') {
    return <PdfPreview path={path} />;
  } else if (/^image/i.test(_.get(attachment, '[0].mimeType', ''))) {
    return <img src={src} className={classes.img} />;
  } else {
    return (
      <>
        <Typography>
          <Trans id="No Preview available"></Trans>
        </Typography>
        {/* <Link href={path} target="blank">
          <Trans>View Here</Trans>
        </Link> */}
      </>
    );
  }
};

export default withStyles(styles)(DocumentPreview);

import React, { useState, useCallback, useEffect } from 'react';
import config from 'config';
import { Trans } from '@lingui/react';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Document, Page } from 'react-pdf';
import _ from 'lodash';
import { getaccessToken } from 'Http/axios';

import { Box } from '@material-ui/core';

const styles = () => ({
  img: {
    width: '180px',
    height: 100,

    overflow: 'hidden !important',
    '&:hover': {
      transform: 'scale(1.5)',
      marginTop: '50px'
    }
  },
  Img: {
    height: '150',
    overflow: 'hidden !important',
    '&:hover': {
      transform: 'scale(1.5)',
      marginLeft: '50px'
    }
  }
});

const PdfPreview = ({ path, autoWidth, autoeight }) => {
  const classes = styles();
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
        className={classes.img}
      >
        <Page pageNumber={1} width={width} scale={1} height="8rem" />
      </Document>
    </div>
  );
};

const { apiConfig } = config.dev;

const Attachpreview = ({ documentId, attachment, classes, path }) => {
  const [src, setSrc] = useState(null);

  //   const { href } = apiConfig[constants.configType.DOCUMENT_MANAGEMENT];
  //   const path = `${href}/download/${documentId}`;

  useEffect(() => {
    if (
      documentId
      //  &&
      // /^image/i.test(_.get(attachment, "attachment[0].mimeType", ""))
    ) {
      fetch(`/api/documentManagement/v1/document/download/${documentId}`, {
        method: 'get',

        headers: {
          Authorization: `Bearer ${getaccessToken()}`,
          'Content-Type': undefined
        }
      }).then((res) => {
        if (res.ok) {
          res.blob().then((b) => {
            let src = URL.createObjectURL(b);

            setSrc(src);
          });
        } else {
          console.error('error');
        }
      });
    }
  }, [documentId, attachment]);

  if (
    attachment &&
    _.get(attachment, 'attachment[0].mimeType', '') === 'application/pdf'
  ) {
    return <PdfPreview path={src} />;
  } else if (/^image/i.test(_.get(attachment, 'attachment[0].mimeType', ''))) {
    return (
      <Box px={5}>
        <img src={src} className={classes.img} />
      </Box>
    );
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

export default withStyles(styles)(Attachpreview);

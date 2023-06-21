import React from 'react'

import config from 'config'
export default function index({ user, partnerdetails }) {
  return (
    <div>
      <iframe
        width="95%"
        height="600"
        frameBorder="0"
        style={{ marginLeft: 30, borderRadius: 8 }}
        // onLoad={() => setIsLoading(false)}
        src={`${config.dev.server.dclm_base_url}/dttm-customer/?DprmTroubleTicket=true&accessToken=${localStorage.getItem('ACCESS_TOKEN')}&sub=${_.get(partnerdetails, 'mainlist.partnerId', '...')}`}
      //   src={`http://localhost:4001/dttm-customer/?DprmTroubleTicket=true&accessToken=${localStorage.getItem('ACCESS_TOKEN')}&sub=${user?.sub}`}
      ></iframe>
    </div>
  )
}


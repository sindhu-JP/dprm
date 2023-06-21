import React from 'react'
import './transferblock.css'



import usericon from '../../../Assets/Icons/usericon.svg'

import {Image} from 'antd'
import { Typography } from '@material-ui/core'

const Transferblock = ({label}) => {

  console.log(label, "kndanaxx")
  return (
    <div> 

      {label.map((el)=> (
        <>
        <div className='userinfo'>
        <Image src={usericon} height={26}></Image> 
        <p style={{ paddingLeft:'6px'}}>{el?.createdBy}  {el?.time}</p>
    </div>
    <div >          
        <div>
          
          <div style={{display: "flex", justifyContent: "flex-end", marginRight: "18px"}}>
            <div style={{backgroundColor: "green", borderRadius:"10px", color: "#000", padding: "5px"}}>
          <Typography>{el?.status}</Typography>
            </div>
          </div>
          <div className='transferpayment_block' >
          <p className='transfer_payment'>{el?.bulkType}</p>
       <p>Req Id: {el?.requestId}</p> 
          </div>
 
       </div>
       

    </div> 
        </>

      ))}
    {/* */}
</div>
  )
}

export default Transferblock
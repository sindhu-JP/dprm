import { createAsyncThunk } from '@reduxjs/toolkit'
import hierarchyApi from 'Http/api/hierarchy'

 import Leadcontroller from './Lead' 
const loadHirarchy = createAsyncThunk(
  'hierarchy/loadHirarchy',
  async ({ name, user, authState }, { dispatch }) => {
    const usergrpinfo = await hierarchyApi.digitalSales(name).catch((err) => {
      throw Error('Failed to Digital sales. Please try again.')
    })

     await dispatch(Leadcontroller.loadAll({user, count:10,usergrpinfo}))
    return usergrpinfo
  },
)

const quoteApprove = createAsyncThunk(
  'hierarchy/quoteApprove',
  async ({ payload, user, authState }, { dispatch }) => {
    const quoteApprovel = await hierarchyApi
      .ApproveQuote(payload)
      .catch((err) => {
        throw Error('Failed to Digital sales. Please try again.')
      })
    return quoteApprovel
  },
)

export default { loadHirarchy , quoteApprove}

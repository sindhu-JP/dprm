
import { TecnotreedigitalSales } from 'Http/axios'
const ExcuteWorkflow = async (payload) => {
    return await TecnotreedigitalSales.post(
        '/bpmn/executeProcess', payload).then(res => {
            if (res?.data?.apiResponse?.status === '200 OK') {
                return res.data
            } else {
                return null
            }
        }).catch(err => {
            return null
        })

}

export default { ExcuteWorkflow }
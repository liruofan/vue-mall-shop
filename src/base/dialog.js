import {Dialog} from 'vant'
export const diaLog = (config={},callback) => {
  Dialog.alert({
      ...config,
      confirmButtonColor:'#eb4450',
      width:'3.2rem'
    }).then(()=>{
      callback && callback()
    })
}
export const diaLogConfirm = (config={},callback) => {
  Dialog.confirm({
      ...config,
      confirmButtonColor:'#eb4450',
      width:'3.2rem'
    }).then(()=>{
      callback && callback()
    }).catch(()=>{})
}





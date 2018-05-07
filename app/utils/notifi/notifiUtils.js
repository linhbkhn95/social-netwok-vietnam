import { ToastContainer, toast } from 'react-toastify';
import ToastnotifiComponent from './ToastNotifiComponent'
module.exports={
     shownotifi: function shownotifi(notifi){
              toast(<ToastnotifiComponent notifi={notifi}/>, {autoClose: 500000})
     }
}

import { toast } from 'react-toastify';
import { css } from 'glamor';

export default class Toast {
    static success(message){
        return toast.success(message,
            {
                className: css({
                    borderRadius: '10px !important',
                    borderLeft: '8px solid #07C50E',                    
                    background: '#ffffff !important',
                    color: '#3e3e3e'
                })
            }
        )
    };
    
    static info(message){
        return toast.info(message,
            {
                className: css({
                    borderRadius: '10px !important',
                    borderLeft: '8px solid #41A3E2',                    
                    background: '#ffffff !important',
                    color: '#3e3e3e'
                })
            }
        )
    };
    
    static warn(message){
        return toast.warn(message,
            {
                className: css({
                    borderRadius: '10px !important',
                    borderLeft: '8px solid #F3CA12',                      
                    background: '#ffffff !important',    
                    color: '#3e3e3e'
                })
            }
        )
    };
    
    static error(message){
        return toast.error(message,
            {
                className: css({
                    borderRadius: '10px !important',
                    borderLeft: '8px solid #E85642',                    
                    background: '#ffffff !important',                    
                    color: 'black'
                })
            }
        )
    };
    
    static white(message){
        return toast(message,
            {
                className: css({
                    borderRadius: '10px !important',
                    borderLeft: '8px solid #ffffff',                    
                    background: '#ffffff !important',
                    color: '#3e3e3e'
                })
            }
        )
    };
    
    static black(message){
        return toast.success(message,
            {
                className: css({
                    borderRadius: '10px !important',
                    borderLeft: '8px solid #000000',                        
                    background: '#ffffff !important',
                    color: '#3e3e3e'
                })
            }
        )
    };
}
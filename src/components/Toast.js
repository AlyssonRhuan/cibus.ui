
import { toast } from 'react-toastify';
import { css } from 'glamor';

export default class Toast {
    static success(message){
        return toast.success(message,
            {
                className: css({
                    borderRadius: '10px !important',
                    borderLeft: '10px solid #07C50E',                    
                    background: '#9dfba0 !important',
                    color: 'black'
                })
            }
        )
    };
    
    static info(message){
        return toast.info(message,
            {
                className: css({
                    borderRadius: '10px !important',
                    borderLeft: '10px solid #41A3E2',                    
                    background: '#a6d5f2 !important',
                    color: 'black'
                })
            }
        )
    };
    
    static warn(message){
        return toast.warn(message,
            {
                className: css({
                    borderRadius: '10px !important',
                    borderLeft: '10px solid #F3CA12',                    
                    background: '#fae99e !important',
                    color: 'black'
                })
            }
        )
    };
    
    static error(message){
        return toast.error(message,
            {
                className: css({
                    borderRadius: '10px !important',
                    borderLeft: '10px solid #E85642',                    
                    background: '#f4aea4 !important',
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
                    borderLeft: '10px solid #ffffff',                    
                    background: '#ffffff !important',
                    color: 'black'
                })
            }
        )
    };
    
    static black(message){
        return toast.success(message,
            {
                className: css({
                    borderRadius: '10px !important',
                    borderLeft: '10px solid #000000',                    
                    background: '#000000 !important',
                    color: 'white'
                })
            }
        )
    };
}
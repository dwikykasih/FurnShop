/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            //mengetahui status
            dispatch(auth()).then(response => {
                //status tidak login
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                    //status login
                } else {
                    //jika admin
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    //status login, namun mencoba login
                    else {
                        if (option === false) {
                            props.history.push('/')
                        }
                    }
                }
            })

        }, [])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}





const BASE_URL=process.env.REACT_APP_BASE_URL 


export const categories={
    CATEGORIES_API:BASE_URL+ '/courses/showAllCategories',
    
}

//auth related endpoints 
export const endpoints={

    SENDOTP_API:BASE_URL+'/auth/sendotp',
    SIGNUP_API:BASE_URL+'/auth/signup',
    LOGIN_API:BASE_URL+'/auth/login',
    RESETPASSTOKEN_API:BASE_URL+'/auth/reset-password-token',
    RESETPASSWORD_API:BASE_URL+'/auth/reset-password'
}

// profile endpoints 
export const profileEndpoints={

    GET_USER_DETAILS_API:BASE_URL+'/profile/getUserDetails',
    GET_USER_ENROLLED_COURSES_API:BASE_URL+'/profile/getEnrolledCourses',
    GET_INSTRUCTOR_DATA_API:BASE_URL+'/profile/instructorDashboard',

}

// student related endpoints 
export const studentsEndpoints={
    COURSE_PAYMENT_API:BASE_URL+'/payment/capturePayment',
    COURSE_VERIFY_API:BASE_URL+'/payment/verifyPayment',
    SEND_PAYMENT_SUCCESS_EMAIL_API:BASE_URL+'/payment/sendPaymentSuccessEmail'
}



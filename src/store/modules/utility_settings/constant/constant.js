/*import axiosClient from "@/axios";*/

export default {
    namespaced: true,
    state: {
        activeStatus: {
            'ACTIVE':'ACTIVE',
            'INACTIVE':'INACTIVE',
            'DRAFT':'DRAFT'
        },
        userStatus: {
            'flagged':'FLAGGED',
            'onboarded':'ONBOARDED',
            'approval_pending':'APPROVAL PENDING',
            'suspended':'SUSPENDED',
            'terminated':'TERMINATED'
        },
        transactionStatus: {
            'failed':'Failed',
            'failed_and_refunded':'Failed and Refunded',
            'pending':'Pending',
            'created':'Created',
            'processing':'Processing',
            'refunded':'Refunded',
            'refund_received':'Refund Received',
            'successful':'Successful',
            'success':'Success',
            'accept':'Accepted',
            'reject':'Rejected',
            'cancel':'Cancelled',
            'admin_to_verify':'Admin To Verify',
            'received':'Received',
            'refund received':'Refund Received',
            'failed and refunded':'Refund Received'
        },
        CatalogTypeList: {
            'OCC':'Occupation',
            'SOF':'Source of Fund',
            'REL':'Relationship',
            'POR':'Purpose of Remittance',
            'DOC':'Customer Document ID Type',
            'PTY':'Payment method',
            'AOD':'Bank Name (Account Deposit)',
            'AGT':'Cash Pickup Payout Payee'
        },
        hrpDecimalPlaces: 5,
    },
    getters: {
        hrpDecimalPlaces(state){
            return state.hrpDecimalPlaces;
        }
    },
    mutations: {
        
    },
    actions: {
        
    }
}

import { LightningElement, wire, track, api } from 'lwc';
import getContacts from '@salesforce/apex/tableController.getContacts';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ACCOUNT_FIELD from '@salesforce/schema/Contact.AccountId';
import MOBILE_PHONE_FIELD from '@salesforce/schema/Contact.MobilePhone';
import CREATED_DATE_FIELD from '@salesforce/schema/Contact.CreatedDate';

const COLUMNS = [
    { label: 'First Name', fieldName: FIRST_NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Last Name', fieldName: LAST_NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'EMAIL', fieldName: EMAIL_FIELD.fieldApiName, type: 'email' },
    { label: 'Account', fieldName:"AccountUrl", type: 'url', 
      typeAttributes: { label: { fieldName: "AccountName" },
      tooltip:"Account", target: "_blank" } },
    { label: 'Mobile Phone', fieldName: MOBILE_PHONE_FIELD.fieldApiName, type: 'phone'},
    { label: 'Created date', fieldName: CREATED_DATE_FIELD.fieldApiName, type: 'date', typeAttributes: {    
        day: "numeric", month: "numeric", year: "numeric", hour: "2-digit", minute:"2-digit", hour12:"false"}}
];

export default class searchTable extends LightningElement {
    @api filterValue;
    columns = COLUMNS;
    contacts;
    error;
    @track inputValue ="";
    
    @wire(getContacts, {searchKey: '$inputValue'})
    getAccList({error,data}) {
        console.log("getAccList activated");
        if(data) {
            var tempAccList = [];
            for (var i=0; i<data.length; i++) {
                let tempRecord = Object.assign({}, data[i]);
                if (tempRecord.Account) {
                    tempRecord.AccountUrl = "/" + tempRecord.AccountId;
                    tempRecord.AccountName = tempRecord.Account?.Name;
                }
                tempAccList.push(tempRecord);
            }
            this.contacts = tempAccList;
            this.error = undefined;
        } else if(error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
}
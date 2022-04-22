import { LightningElement, track } from 'lwc';

export default class Page extends LightningElement {
    @track filterValue; 
    handleFilterValueFunction(event){
        this.filterValue = event.detail;
    }
}
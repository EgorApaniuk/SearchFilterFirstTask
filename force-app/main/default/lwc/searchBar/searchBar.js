import { LightningElement } from 'lwc';
export default class SearchBar extends LightningElement {
    inputValue;
    
    filterFunction(event){
        this.inputValue = this.template.querySelector('.input1').value;
        const filterEvent = new CustomEvent ('getfiltervalue',{
            detail: this.inputValue});
        this.dispatchEvent(filterEvent);
    }
}
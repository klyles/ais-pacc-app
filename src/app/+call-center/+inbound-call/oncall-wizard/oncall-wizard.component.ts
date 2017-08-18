import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'onCall-wizard',
  templateUrl: './oncall-wizard.component.html',
  styles:[`
    .step2 li {
      margin: 0.5em;
      border: 1px solid #fff;
      padding: 0.5em;
      background-color: #739e73;
      border-radius: 5px;
      color: #fff;
    }
    li {
      list-style: none;

    }
    `]
})
export class OnCallComponent implements OnInit {

  public items:Array<string> = ['Seton', 'Providence', 'Daughters of Charity', 'Centro', 'Nazareth',
                                'John Matthew', 'Seal Paul', 'John Paul', 'John Sena', 'Kyle', 'Justin TimberLake','Eminem'];

  employeeName: string;
  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  constructor() { }

  ngOnInit() {
    this.employeeName = 'Seton'
  }

  onWizardComplete(data){
    alert('oncall loaded!!');
  }

  private get disabledV():string {
    return this._disabledV;
  }

  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

}

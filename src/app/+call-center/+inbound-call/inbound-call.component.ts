import { Component, OnInit, ViewChild } from '@angular/core';
import { FadeInTop } from '../../shared/animations/fade-in-top.decorator';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { InboundService } from './inbound-call.service';


@FadeInTop()
@Component({
  selector: 'app-inbound-call',
  templateUrl: './inbound-call.component.html',
  styles: [`
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
    ::-webkit-input-placeholder {
      color: #000000;
    }
    ::-moz-placeholder { /* Firefox 19+ */
      color: #000000;
    }
    :-ms-input-placeholder { /* IE 10+ */
      color: #000000;
    }
    :-moz-placeholder { /* Firefox 18- */
      color: #000000;
    }
    input:focus::-webkit-input-placeholder {
        color: transparent;
    }
    input:focus::-moz-placeholder {
      color: transparent;
    }
    input:focus:-ms-input-placeholder {
      color: transparent;
    }
    input:-moz-placeholder { /* Firefox 18- */
      color: #000000;
    }
  `]
})
export class InboundCallComponent implements OnInit {
  @ViewChild('childModal') public childModal: ModalDirective;
  callStatus: string;

  startCallTime: number;
  endCallTime: number;
  callDuration: any;
  totalMinutes: any;
  totalSeconds: any;
  totalCallTime: any;

  startLoad: boolean;
  endLoad: boolean;


  employeeName: string;
  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;

  patientDetails: any;
  patientData: any;
  patientName: any;
  patientTelecom: any;
  patientEmail: any;
  patientAddress: any;

  listOfPatients: any;
  patientList: any;
  data: any;
  isLoading: boolean;

  form: any = {
  };

  constructor(
    private _InboundService: InboundService
  ) {
    this.startLoad = false;
    this.endLoad = false;
    this.isLoading = true;
  }

  ngOnInit() {
    this.employeeName = 'Seton';
    this.getPatientData();
    this.getPatientsList()
  }

  public getPatientData() {
    this.patientDetails = this._InboundService.getInboundData()
      .subscribe((response: any) => {
        this.patientData = response;
        this.patientName = response.name[0];
        this.patientTelecom = response.telecom[0];
        this.patientEmail = response.telecom[1];
        this.patientAddress = response.address[0];
        console.log(this.patientData);
      })
  }
  /** this is all patient data */
  public getPatientsList() {
    this.patientList = this._InboundService.getPatientsList()
      .subscribe((response: any) => {
        this.data = response;
        this.isLoading = false;
        console.log(this.data);
      })
  }
  public onSavePatientData() {
    alert('updated');
  }

  public saveNotes(): void {
    this.childModal.show();
  }
  public hideChildModal(): void {
    this.childModal.hide();
  }
  public startCall() {
    this.startLoad = true;
    this.startCallTime = Date.now();
  }
  public endCall() {
    this.endLoad = true;
    this.endCallTime = Date.now();
    // window.location.reload();
  }
  // getCallDuration(callDuration) {
  //     let callDuration = Math.abs(this.endCallTime - this.startCallTime) / 36e5;
  //     return callDuration;
  //     // this.totalMinutes = Math.floor(this.callDuration/60000);
  //     // this.totalSeconds = ((this.callDuration % 60000) / 1000).toFixed(0);
  //     // this.totalCallTime = this.totalMinutes + ":" + (this.totalSeconds < 10 ? '0': '') + this.totalSeconds;
  //     this.totalMinutes = (callDuration / 60000);
  //     // this.totalSeconds = (this.callDuration/1000) % 60;
  //     console.log(this.totalMinutes);
  // }

  public items: Array<string> = ['Seton', 'Providence', 'Daughters of Charity', 'Centro', 'Nazareth',
    'John Matthew', 'Seal Paul', 'John Paul', 'John Sena', 'Kyle', 'Justin TimberLake', 'Eminem'];

  onWizardComplete(data) {
    alert('oncall loaded!!');
  }

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }


}

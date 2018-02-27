import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FadeInTop } from '../../shared/animations/fade-in-top.decorator';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { InboundService } from './inbound-call.service';
import * as moment from 'moment';

import { fadeInTop } from '../shared/animations/router.animations';


declare var $: any;

@FadeInTop()
@Component({
  selector: 'app-inbound-call',
  templateUrl: './inbound-call.component.html',
  styles: [`
    .step2 {
      border: 1px solid #fff;
      padding: 0.5em;
      background-color: #739e73;
      border-radius: 5px;
      color: #fff;
      display: block;
    }
    li {list-style: none;}
    .step2 a {color: #fff; font-weight: 700;}
    .two {
       font-size: 20px;
    }
  `],
})
export class InboundCallComponent implements OnInit, OnDestroy {
  @ViewChild('childModal') public childModal: ModalDirective;
  // private callStatus: string;

  private $startCallTime: any;
  private $endCallTime: any;
  private $minutes: any;
  private $seconds: any;
  private context: any;
  private individualDetails: any;
  private patientList: any;
  private callStatusData: any;
  private callOutComesData: any;
  private selectedContactType: any;
  private selectedGender: any;
  public selectedState: any;
  private statesList: any;
  private states_list: any;
  private callsList: any;
  private calls_list: any;
  private callsSum: any;
  private patientAge: any;
  public _id: any;
  public newData: any;
  public selectedItem: '';
  // public selectedOutCome: '';
  public patID: number;
  private last_name: string;
  private first_name: string;
  private middle_name: string;
  private gender: string;
  private dob: any;
  private home_phone: string;
  private work_phone: string;
  private mobile_phone: string;
  private email: string;
  private address1: string;
  private address2: string;
  private zip: string;
  private city: string;
  private state: string;
  private preferred_contact_method: string;
  private _startRecording: boolean;
  private _endRecording: boolean;
  private _endCall: boolean;
  private _addPatients: boolean;
  private _showsearchResults: boolean;
  private _loadmetrics: boolean;
  private callsListLength: boolean;
  private applications: any;
  private appLinks: any;
  public notes: string = '';
  private _callWarning: boolean = true;
  private _warningMessage: string = 'Please start the call first.';

  phoneNumber: any;

  birthdate: Date;
  form: any = { $searchStr: '', searchObjects: [], display: 'none' };
  addPatient: any = {};
  editPatient: any = {};

  // public selected: any[] = [];

  selectedOutCome: any = [];

  sessionID: any;
  csrf: any;
  _wrap$Codes: any = {
    $codes: {}
  }
  demoStyle = 'style1';

  demoShowTabs = false;

  toggle = {};

  constructor(
    private _InboundService: InboundService
  ) {
    this._startRecording = false;
    this._endRecording = false;
    this._endCall = true;
    this._showsearchResults = false;
    this._loadmetrics = false;
    this._addPatients = false;
    this.callsListLength = false;
  }

  toggleMultiSelect(event, val) {
    event.preventDefault();
    if (this.selectedOutCome.indexOf(val) === -1) {
      this.selectedOutCome = [...this.selectedOutCome, val];
    } else {
      this.selectedOutCome = this.selectedOutCome.filter(function (elem) {
        return elem !== val;
      })
      console.log(this.selectedOutCome);
    }
  }

  ngOnInit() {
    this.getCallStatus();
    this.getStates();
    this.getApps();
    this.sessionID = sessionStorage.getItem('SessionId');
    this.csrf = sessionStorage.getItem('csrf');
    this.setMessageTimeOut();
  }
  setStyle(style) {
    this.demoStyle = style
  }
  ngOnDestroy() {
    console.clear();
    console.log('On Destroy');
  }
  public startCall() {
    this._callWarning = false;

    this._startRecording = true;
    const startTime = new Date();
    this.$startCallTime = startTime.getTime();
    this._endRecording = false;
    this._endCall = false;
  }
  public endCall() {
    // check to see if a wrap code has been given...
    // otherwise, throw an error.
    if (this.selectedOutCome.length){
      this._callWarning = false;
      this._endRecording = true;
      const endTime = new Date();
      this.$endCallTime = endTime.getTime();

      const diff = this.$endCallTime - this.$startCallTime;
      this.$minutes = Math.floor(diff / 60000);
      this.$seconds = Math.floor(diff / 1000) % 60;
      this._endCall = true;
      this.postNotes().subscribe(
        (res: any) => {
          console.log(res)
          this.postCalls(res.id);
          // this.reloadTimeOut();
        }
      )
    } else {
      this._warningMessage = 'Please select an outcome before ending the call.'
      this._callWarning = true;
    }
  }
  public loadMetrics($id: any) {
    this._InboundService.getPatientDetail($id)
      .subscribe(
      (response: any) => {
        this._loadmetrics = true;
        this.individualDetails = response;
        this.patID = response.id;
        this.selectedContactType = this.individualDetails['preferred_contact_method'];
        this.selectedState = this.individualDetails['state'];
        this.selectedGender = this.individualDetails['gender'];
        this.birthdate = this.individualDetails['dob'];
        this.patientAge = this.getPatAge(this.individualDetails['dob']);
        this.phoneNumber = this.individualDetails['home_phone'];
        // if (this.phoneNumber != null) {
        //   this.home_phone = this.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        // } else {
        //   this.home_phone = this.phoneNumber;
        // }
        this.phoneNumber ? this.home_phone = this.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
          : this.home_phone = this.phoneNumber;
        this._addPatients = false;
        console.log(this.home_phone);
        this.getCalls();
      });
  }
  public getCallStatus() {
    this.patientList = this._InboundService.getCallStatus()
      .subscribe((response: any) => {
        this.callStatusData = response;
        if (this.callStatusData.length > 0) {
          this.selectedItem = this.callStatusData[0]['status'];
        }
      })
  }
  public displayResults() {
    if (this.form.$searchStr.length > 0) {
      this._InboundService.getSearchData(this.form.$searchStr)
        .subscribe(
        (response: any) => {
          this.form.searchObjects = response.filter;
          this._showsearchResults = true;
          this.form.display = 'block';
        }
        )
    } else {
      this.form.searchObjects = [];
    }
  }
  public getApps() {
    this.appLinks = this._InboundService.getApps()
      .subscribe((response: any) => {
        this.applications = response.applications;
        console.log(this.applications);
      })
  }
  // public getCallOutComes() {
  //   this.patientList = this._InboundService.getCallOutComes()
  //     .subscribe((response: any) => {
  //       this.callOutComesData = response;
  //       if (this.callOutComesData.length > 0) {
  //         this.selectedOutCome = this.callOutComesData[0]['outcome_desc'];
  //       }
  //     })
  // }
  public getI3Messages() {
    this._InboundService.getI3Messages(this.sessionID, this.csrf)
      .subscribe(
      (response: any) => {
        this._wrap$Codes.$codes = response.items;
      });
  }
  public getStates() {
    this.statesList = this._InboundService.getStates()
      .subscribe((response: any) => {
        this.states_list = response;
      })
  }
  public getCalls() {
    this.callsList = this._InboundService.getCalls(this.patID)
      .subscribe((response: any) => {
        this.calls_list = response;
        this.callsSum = this.calls_list.length;
        if (this.calls_list.length > 0) {
          this.callsListLength = true;
        }
      })
  }
  public postCalls(notesID) {
    this._id = this.patID;
    const postCallData = {
      'call_start_date_time': moment(this.$startCallTime).format('MM/DD/YYYY, hh:mm:ss a'),
      'call_stop_date_time': moment(this.$endCallTime).format('MM/DD/YYYY, hh:mm:ss a'),
      'call_agent': sessionStorage.getItem('userName'),
      'call_note_id': notesID
    }
    console.log(postCallData);
    this._InboundService.postCallsData(postCallData, this._id);
    this.callBackTimeOut();
  }
  public addPatientList() {
    this.context = null;
    this.last_name = '';
    this.first_name = '';
    this.middle_name = '';
    this.home_phone = '';
    this.work_phone = '';
    this.mobile_phone = '';
    this.email = '';
    this.address1 = '';
    this.address2 = '';
    this.zip = '';
    this.city = '';
    this.state = '';
    this.preferred_contact_method = '';

    this.form.display = 'none',
      this.selectedGender = 'Select Gender',
      this.selectedContactType = 'Select Preferred Contact';
    this.selectedState = 'Select State';
    this._addPatients = true;
    this._loadmetrics = false;
  }
  public updatePatientsList(obj: any) {
    this.context = obj;
    this.last_name = this.context.last_name;
    this.first_name = this.context.first_name;
    this.middle_name = this.context.middle_name;
    this.dob = this.birthdate;
    this.selectedGender = this.selectedGender;
    this.home_phone = this.context.home_phone;
    this.work_phone = this.context.work_phone;
    this.mobile_phone = this.context.mobile_phone;
    this.email = this.context.email;
    this.address1 = this.context.address1;
    this.address2 = this.context.address2;
    this.zip = this.context.zip;
    this.city = this.context.city;
    this.selectedState = this.selectedState;
    this.preferred_contact_method = this.preferred_contact_method;
    this._addPatients = true;
    this._loadmetrics = false;
  }
  public onPatientUpdate() {
    this._id = this.patID;
    if (this.context != null) {
      const editData = {
        'last_name': this.last_name.toUpperCase(),
        'first_name': this.first_name.toUpperCase(),
        'middle_name': this.middle_name,
        'dob': moment(this.birthdate).format('MM/DD/YYYY'),
        'gender': this.selectedGender,
        'home_phone': this.home_phone,
        'work_phone': this.work_phone,
        'mobile_phone': this.mobile_phone,
        'email': this.email,
        'address1': this.address1,
        'address2': this.address2,
        'zip': this.zip,
        'city': this.city,
        'state': this.selectedState,
        'preferred_contact_method': this.selectedContactType
      }
      this._InboundService.putPatientDetails(editData, this._id)
    } else {
      const newData = {
        'first_name': this.first_name.toUpperCase(),
        'middle_name': this.middle_name,
        'last_name': this.last_name.toUpperCase(),
        'dob': moment(this.birthdate).format('MM/DD/YYYY'),
        'gender': this.selectedGender,
        'home_phone': this.home_phone,
        'work_phone': this.work_phone,
        'mobile_phone': this.mobile_phone,
        'email': this.email,
        'address1': this.address1,
        'address2': this.address2,
        'zip': this.zip,
        'city': this.city,
        'state': this.selectedState,
        'preferred_contact_method': this.selectedContactType
      }
      this._InboundService.postNewPatient(newData);
    }
    this._addPatients = false;
    this.displayResults();
   // this.saveNotes();
    this.loadMetrics(this.patID);
  }
  public showContactType(contactMethod: any) {
    this.selectedContactType = contactMethod;
  }
  public showGender(gender: any) {
    this.selectedGender = gender;
  }
  public showStatus(status: any) {
    this.selectedItem = status;
  }
  public showState(state: any) {
    this.selectedState = state;
  }
  public showOutCome(callOutCome) {
    this.selectedOutCome = callOutCome;
  }
  public postNotes() {
    // this.childModal.show();
    const data = {
      note_text: this.notes,
      call_agent: sessionStorage.getItem('userName'),
      patientId: this.individualDetails.id,
    }
    return this._InboundService.postNotes(data);
  }
  public hideChildModal(): void {
    this.childModal.hide();
  }
  public getPatAge(d: any) {
    const age = moment().diff(d, 'years');
    return age;
  }
  public callBackTimeOut() {
    setTimeout(() => this.getCalls(), 1000);
  }
  public reloadTimeOut() {
    setTimeout(() => window.location.reload(), 5000)
  }
  public setMessageTimeOut() {
    setTimeout(() => this.getI3Messages(), 2500)
  }
  onWizardComplete(data) {
    alert('oncall loaded!!');
  }
}

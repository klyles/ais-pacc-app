import {NgModule} from '@angular/core';

import {SmartadminModule} from '../../shared/smartadmin.module'

import {InboundCallRoutingModule} from './inbound-call-routing.module';
import {InboundCallComponent} from './inbound-call.component';
import {SocialNetworkComponent} from './live-feeds/social-network.component';
import {LiveFeedsComponent} from './live-feeds/live-feeds.component';
import {LiveStatsComponent} from './live-feeds/live-stats.component';
import {RevenueComponent} from './live-feeds/revenue.component';
import {BirdEyeComponent} from './bird-eye/bird-eye.component';
import {CalendarModule} from '../../+calendar/calendar.module';
import { TodoWidgetComponent } from './todo-widget/todo-widget.component';
import { TodoListComponent } from './todo-widget/todo-list.component';
import {FlotChartModule} from '../../shared/graphs/flot-chart/flot-chart.module';
import {D3Module} from '../../shared/graphs/d3/d3.module';
import { WizardsModule } from '../../+forms/+wizards/wizards.module';

import { OnCallComponent } from './oncall-wizard/oncall-wizard.component';

import {SmartadminWizardsModule} from '../../shared/forms/wizards/smartadmin-wizards.module';

import { SelectModule } from 'ng2-select';

import { ModalModule } from 'ngx-bootstrap';


@NgModule({
  imports: [
    SmartadminModule,
    InboundCallRoutingModule,
    CalendarModule,
    FlotChartModule,
    D3Module,
    WizardsModule,
    SmartadminWizardsModule,
    SelectModule,
    ModalModule.forRoot()
  ],
  declarations: [
    InboundCallComponent,
    LiveFeedsComponent,
    LiveStatsComponent,
    RevenueComponent,
    SocialNetworkComponent,

    BirdEyeComponent,

    TodoWidgetComponent,

    TodoListComponent,

    OnCallComponent
  ],
  providers: [],
})
export class InboundCallModule {

}

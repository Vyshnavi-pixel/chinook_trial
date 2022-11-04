import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { MdbRangeModule } from 'mdb-angular-ui-kit/range';


import { NgbdSortableHeader, NgbdTableSortable } from './table-sortable';

@NgModule({
	imports: [BrowserModule, CommonModule, NgbModule],
	declarations: [NgbdTableSortable, NgbdSortableHeader],
	exports: [NgbdTableSortable],
	bootstrap: [NgbdTableSortable],
})
export class NgbdTableSortableModule {}

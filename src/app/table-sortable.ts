import {
  Component,
  Directive,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';


// interface Country {
// 	id: number;
// 	name: string;
// 	flag: string;
// 	area: number;
// 	population: number;
// }

interface Flight {
  airline_name: string;
  flight_no: string;
	stop: string;
	image: string;
  duration: string;
  dept_time: string;
  arr_time: string;
  price: number;
}

const FLIGHTS: Flight[] = [
  // {
  // 	id: 1,
  // 	name: 'Russia',
  // 	flag: 'f/f3/Flag_of_Russia.svg',
  // 	area: 17075200,
  // 	population: 146989754,
  // },
  // {
  // 	id: 2,
  // 	name: 'Canada',
  // 	flag: 'c/cf/Flag_of_Canada.svg',
  // 	area: 9976140,
  // 	population: 36624199,
  // },
  {
    airline_name: 'Air Asia',
    flight_no: 'I5-972',
		stop: 'Non-stop',
		image: 'https://images.squarespace-cdn.com/content/v1/5a5dbe4632601eb31977f947/1629703651716-J8RVOTD1XO3SDINHP2RG/unnamed+%281%29.png',
    duration: '1h 15m',
    dept_time: '14:25',
    arr_time: '15:40',
    price: 4848,
  },
  {
    airline_name: 'Air Asia',
    flight_no: 'I5-1453',
		stop: '1-stop',
		image: 'https://images.squarespace-cdn.com/content/v1/5a5dbe4632601eb31977f947/1629703651716-J8RVOTD1XO3SDINHP2RG/unnamed+%281%29.png',
    duration: '6h 5m',
    dept_time: '13:40',
    arr_time: '19:45',
    price: 5452,
  },
];

// export type SortColumn = keyof Country | '';
export type SortColumn = keyof Flight | '';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdSortableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'ngbd-table-sortable',
  templateUrl: './table-sortable.html',
})
export class NgbdTableSortable {
  // countries = COUNTRIES;

  flights = FLIGHTS;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    // if (direction === '' || column === '') {
    // 	this.countries = COUNTRIES;
    // } else {
    // 	this.countries = [...COUNTRIES].sort((a, b) => {
    // 		const res = compare(a[column], b[column]);
    // 		return direction === 'asc' ? res : -res;
    // 	});
    // }

    if (direction === '' || column === '') {
      this.flights = FLIGHTS;
    } else {
      this.flights = [...FLIGHTS].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}

// NATI-RETI 2026 schedule data (generated from official timetable)
// Source: Claude Design project "Horario interactivo NATI-RETI 2026" — Schedule Concepts 3A/3B
window.SCHEDULE = (function () {
const CATS = [
 { id: 'prayer', label: 'Prayer & Worship', chip: 'Prayer', color: '#3E6FA3' },
 { id: 'plenary', label: 'Plenaries & Speakers', chip: 'Plenaries', color: '#C6532F' },
 { id: 'study', label: 'Study Sessions', chip: 'Study Session', color: '#5E8C3A' },
 { id: 'visit', label: 'Study Visits & Tours', chip: 'Study Visit', color: '#2E9BB5' },
 { id: 'meals', label: 'Meals & Breaks', chip: 'Meals', color: '#E2A93B' },
 { id: 'free', label: 'Free Time', chip: 'Free', color: '#9A9288' },
 { id: 'travel', label: 'Travel & Logistics', chip: 'Travel', color: '#1F3B5B' }
];
const PHASES = [
 { id: 'usa', label: 'USA Phase', city: 'Detroit, MI', color: '#C6532F' },
 { id: 'transition', label: 'Transition', city: 'Detroit → Toronto', color: '#E2A93B' },
 { id: 'canada', label: 'Canada Phase', city: 'Toronto, ON', color: '#3E6FA3' }
];
// e: [start, end, title, short, cat, who, loc, cat2]
// cat2: optional secondary category — e.g. plenaries held during a study visit
const E = (start, end, title, short, cat, who, loc, cat2) => {
  const min = t => +t.slice(0, 2) * 60 + +t.slice(3);
  return { start, end, s: min(start), e: min(end), title, short: short || title, cat, cat2: cat2 || '', who: who || '', loc: loc || '' };
};
const DAYS = [
 { n: 1, weekday: 'Monday', dnum: '03', phase: 'usa', theme: 'Introductory Day - Pillar Overview', city: 'Detroit, MI', date: 'Monday, August 3', events: [
   E('07:30','13:00','Arrivals','','travel'),
   E('13:00','14:00','Orientation Session','','travel'),
   E('14:00','15:00','Opening Celebration','','prayer'),
   E('15:00','15:30','Break','','meals'),
   E('15:30','16:30','Welcome Plenary: Religious Landscape in the USA','Welcome Plenary','plenary'),
   E('16:30','17:00','Break','','meals'),
   E('17:00','18:00','Study Session','','study'),
   E('18:00','18:30','Evening Prayer','','prayer'),
   E('18:30','19:30','Dinner','','meals'),
   E('19:30','20:30','Free','','free')
 ]},
 { n: 2, weekday: 'Tuesday', dnum: '04', phase: 'usa', theme: 'Climate Justice', city: 'Detroit, MI', date: 'Tuesday, August 4', events: [
   E('07:30','08:45','Breakfast','','meals'),
   E('08:45','09:20','Morning Prayer','','prayer'),
   E('09:20','10:30','Plenary: Dr. James Perkinson (ETS)','Plenary','plenary','Dr. James Perkinson'),
   E('10:30','11:00','Break','','meals'),
   E('11:00','12:30','Council of All Beings Exercise','','study'),
   E('12:30','14:30','Lunch','','meals'),
   E('14:30','16:00','Study Session','','study'),
   E('16:00','16:15','Break','','meals'),
   E('16:15','17:00','Study Session','','study'),
   E('17:00','18:00','Free Time','','free'),
   E('18:00','18:30','Evening Prayer','','prayer'),
   E('18:30','19:30','Dinner','','meals'),
   E('19:30','20:30','Free','','free')
 ]},
 { n: 3, weekday: 'Wednesday', dnum: '05', phase: 'usa', theme: 'Climate Justice', city: 'Detroit, MI', date: 'Wednesday, August 5', events: [
   E('07:30','08:45','Breakfast','','meals'),
   E('08:45','09:20','Morning Prayer','','prayer'),
   E('09:20','12:30','Travel to Study Visit','','visit'),
   E('12:30','16:15','Study Visit: Trip to Freedom Dreams EcoVillage','Study Visit','visit','Hands-on work day: pathway building, gardening, weed clearing, and light supervised deconstruction (tools & PPE provided). Wear clothes that can get dirty; bring hat, sunglasses, and water bottle — gloves and safety goggles provided','Freedom Dreams EcoVillage'),
   E('16:15','17:00','Study Session','','study'),
   E('17:00','18:00','Free Time','','free'),
   E('18:00','18:30','Evening Prayer (Plenary Hall)','Evening Prayer','prayer','','Plenary Hall'),
   E('18:30','19:30','Dinner','','meals'),
   E('19:30','20:30','Free','','free')
 ]},
 { n: 4, weekday: 'Thursday', dnum: '06', phase: 'usa', theme: 'Secularism and Laicity', city: 'Detroit, MI', date: 'Thursday, August 6', events: [
   E('07:30','08:45','Breakfast','','meals'),
   E('08:45','09:20','Morning Prayer','','prayer'),
   E('09:20','10:30','Plenary: Amanda Tyler','Plenary','plenary','Amanda Tyler'),
   E('10:30','11:00','Break','','meals'),
   E('11:00','12:30','Plenary','','plenary'),
   E('12:30','14:30','Lunch','','meals'),
   E('14:30','16:00','Study Session','','study'),
   E('16:00','16:15','Break','','meals'),
   E('16:15','17:00','Study Session','','study'),
   E('17:00','18:00','Check-in Session','','travel'),
   E('18:00','18:30','Evening Prayer','','prayer'),
   E('18:30','19:30','Dinner','','meals'),
   E('19:30','20:30','Free','','free')
 ]},
 { n: 5, weekday: 'Friday', dnum: '07', phase: 'usa', theme: 'Racism and Anti-Racism', city: 'Detroit, MI', date: 'Friday, August 7', events: [
   E('07:30','08:45','Breakfast','','meals'),
   E('08:45','09:20','Morning Prayer','','prayer'),
   E('09:20','14:30','Study Visit to 2nd Baptist Church (Underground Railroad)','Study Visit to 2nd Baptist Church','visit','','2nd Baptist Church, Detroit'),
   E('14:30','16:15','Walking Tour of Detroit','','visit','','Detroit, MI'),
   E('16:15','17:00','Study Session','','study'),
   E('17:00','18:00','Free Time','','free'),
   E('18:00','18:30','Evening Prayer','','prayer'),
   E('18:30','19:30','Dinner','','meals'),
   E('19:30','20:30','Free','','free')
 ]},
 { n: 6, weekday: 'Saturday', dnum: '08', phase: 'usa', theme: 'Racism and Anti-Racism', city: 'Detroit, MI', date: 'Saturday, August 8', events: [
   E('07:30','08:45','Breakfast','','meals'),
   E('08:45','09:20','Morning Prayer','','prayer'),
   E('09:20','10:30','Plenary','','plenary'),
   E('10:30','11:00','Break','','meals'),
   E('11:00','12:30','Plenary','','plenary'),
   E('12:30','14:30','Lunch','','meals'),
   E('14:30','16:00','Study Session','','study'),
   E('16:00','16:15','Break','','meals'),
   E('16:15','17:00','Study Session','','study'),
   E('17:00','18:00',"Facilitator's Meeting",'','travel'),
   E('18:00','18:30','Evening Prayer','','prayer'),
   E('18:30','19:30','Dinner','','meals'),
   E('19:30','20:30','Free','','free')
 ]},
 { n: 7, weekday: 'Sunday', dnum: '09', phase: 'transition', theme: 'Travel from Detroit to Toronto', city: 'Detroit → Toronto', date: 'Sunday, August 9', events: [
   E('08:00','09:30','Gateway to Freedom Monument Stop and border crossing to Windsor, Canada.','Gateway to Freedom Monument Stop','visit','','Windsor, ON'),
   E('09:30','10:15',"Ecumenical Prayers with the Windsor Community @ All Saints' Anglican Church","Ecumenical Prayers with the Windsor Community",'prayer','',"All Saints' Anglican Church, Windsor"),
   E('10:15','11:00','Walk City Hall Square to Tower of Freedom Monument (Windsor, ON)','Walk City Hall Square','visit','','Windsor, ON'),
   E('11:00','12:00','Lecture & Lunch at Tanner-Price AME Church','Lecture & Lunch','plenary','','Tanner-Price AME Church'),
   E('12:00','12:15','Departure for Sandwich Baptist Church','','travel','','Sandwich Baptist Church'),
   E('12:15','13:00','Sandwich Baptist Church - Underground Railroad Site Visit','Sandwich Baptist Church','visit','','Sandwich Baptist Church'),
   E('13:00','14:00','Departure for Toronto','','travel','','Toronto, ON')
 ]},
 { n: 8, weekday: 'Monday', dnum: '10', phase: 'canada', theme: 'Interfaith Dialogue', city: 'Toronto, ON', date: 'Monday, August 10', events: [
   E('07:30','08:45','Breakfast: Burwash','Breakfast','meals','','Burwash Hall'),
   E('08:45','09:20','Land Acknowledgment in Indigenous Garden','','prayer','','Indigenous Garden'),
   E('09:20','10:30',"Plenary - End of Life Panel - Bahai'i Centre",'Plenary','plenary','',"Bahá'í Centre",'visit'),
   E('10:30','11:00','Break','','meals'),
   E('11:00','13:00',"Plenary - Bahai'i Centre",'Plenary','plenary','',"Bahá'í Centre",'visit'),
   E('13:00','14:30','Lunch: Burwash','Lunch','meals','','Burwash Hall'),
   E('14:30','16:00',"Study Session - at Bahai'i Centre",'Study Session','study','',"Bahá'í Centre"),
   E('16:00','16:15','Break','','meals'),
   E('16:15','17:00',"Study Session - at Bahai'i Centre",'Study Session','study','',"Bahá'í Centre"),
   E('17:00','17:30','Free Time','','free'),
   E('17:30','18:00','Evening Prayer','','prayer'),
   E('18:00','19:00','Dinner: Burwash','Dinner','meals','','Burwash Hall'),
   E('19:00','20:30','Free','','free')
 ]},
 { n: 9, weekday: 'Tuesday', dnum: '11', phase: 'canada', theme: 'Interfaith Dialogue', city: 'Toronto, ON', date: 'Tuesday, August 11', events: [
   E('07:30','08:45','Breakfast: Burwash','Breakfast','meals','','Burwash Hall'),
   E('08:45','09:20','Morning Prayer - Supported Becca in Liturgy.','Morning Prayer','prayer','Becca'),
   E('09:20','10:30','Plenary - Interfaith Panel','Plenary','plenary'),
   E('10:30','11:00','Break','','meals'),
   E('11:00','12:30','Plenary - Dr. Nazila Isgandarova','Plenary','plenary','Dr. Nazila Isgandarova'),
   E('12:30','14:30','Lunch: Burwash','Lunch','meals','','Burwash Hall'),
   E('14:30','16:00','Study Session','','study'),
   E('16:00','16:15','Break','','meals'),
   E('16:15','17:00','Study Session','','study'),
   E('17:00','17:30','Free Time','','free'),
   E('17:30','18:00','Evening Prayer','','prayer'),
   E('18:00','19:00','Dinner: Burwash','Dinner','meals','','Burwash Hall'),
   E('19:00','20:00','Check-in Session - CCC Invitation','Check-in Session','travel'),
   E('20:00','20:30','Free','','free')
 ]},
 { n: 10, weekday: 'Wednesday', dnum: '12', phase: 'canada', theme: 'Solidarity with Indigenous Communities', city: 'Toronto, ON', date: 'Wednesday, August 12', events: [
   E('07:30','08:45','Breakfast: Burwash','Breakfast','meals','','Burwash Hall'),
   E('08:45','09:20','Morning Prayer','','prayer'),
   E('09:20','10:30','Study Session','','study'),
   E('10:30','11:00','Break','','meals'),
   E('11:00','12:30','Study Session','','study'),
   E('12:30','14:00','Lunch: Burwash','Lunch','meals','','Burwash Hall'),
   E('14:00','17:00','Blanket Exercise','','study'),
   E('17:00','17:30','Free Time','','free'),
   E('17:30','18:00','Evening Prayer','','prayer'),
   E('18:00','19:00','Dinner: Burwash','Dinner','meals','','Burwash Hall'),
   E('19:00','20:30','Free','','free')
 ]},
 { n: 11, weekday: 'Thursday', dnum: '13', phase: 'canada', theme: 'Solidarity with Indigenous Communities', city: 'Toronto, ON', date: 'Thursday, August 13', events: [
   E('07:30','08:45','Bagged Breakfast','','meals'),
   E('08:45','09:20','Bus Travel','','travel'),
   E('09:20','12:30','Study Visit - Tour of the Former Mohawk Institute Residential School. At the Woodland Cultural Centre.','Study Visit','visit','','Woodland Cultural Centre'),
   E('12:30','14:00','Lunch at Five Oaks retreat Centre','Lunch','meals','','Five Oaks Retreat Centre'),
   E('14:00','16:15','Study visit to Five Oaks Retreat Centre - Facilitated learning on the land with Stephanie Hill','Study visit','visit','Stephanie Hill','Five Oaks Retreat Centre'),
   E('16:15','18:00','Bus Travel','','travel'),
   E('18:00','19:00','Dinner: Burwash','Dinner','meals','','Burwash Hall'),
   E('19:00','20:30','Free','','free')
 ]},
 { n: 12, weekday: 'Friday', dnum: '14', phase: 'canada', theme: 'Wealth Disparity and Poverty', city: 'Toronto, ON', date: 'Friday, August 14', events: [
   E('07:30','08:45','Breakfast: Burwash','Breakfast','meals','','Burwash Hall'),
   E('08:45','09:20','Morning Prayer','','prayer'),
   E('09:20','10:30','Plenary - Deivit M, Dean Dettloff, Maggie Helwig','Plenary','plenary','Deivit M, Dean Dettloff, Maggie Helwig'),
   E('10:30','11:00','Break','','meals'),
   E('11:00','12:30','Karen Puddicombe (CCC project on poverty) - Plenary','Karen Puddicombe','plenary','Karen Puddicombe'),
   E('12:30','14:30','Lunch: Burwash','Lunch','meals','','Burwash Hall'),
   E('14:30','16:00','Study Session','','study'),
   E('16:00','16:15','Break','','meals'),
   E('16:15','17:00','Study Session','','study'),
   E('17:00','17:30','Free Time','','free'),
   E('17:30','18:00','Evening Prayer','','prayer'),
   E('18:00','19:00','Dinner: Burwash','Dinner','meals','','Burwash Hall'),
   E('19:00','20:00',"Facilitator's Meeting",'','travel'),
   E('20:00','20:30','Free','','free')
 ]},
 { n: 13, weekday: 'Saturday', dnum: '15', phase: 'canada', theme: 'Wealth Disparity and Poverty', city: 'Toronto, ON', date: 'Saturday, August 15', events: [
   E('07:30','08:45','Breakfast: Burwash','Breakfast','meals','','Burwash Hall'),
   E('08:45','09:20','Morning Prayer','','prayer'),
   E('09:20','10:30','Plenary - Rev. Jeffrey Dale','Plenary','plenary','Rev. Jeffrey Dale'),
   E('10:30','11:00','Break','','meals'),
   E('11:00','12:30','Plenary','','plenary'),
   E('12:30','14:30','Lunch: Burwash','Lunch','meals','','Burwash Hall'),
   E('14:30','16:00','Study Session','','study'),
   E('16:00','16:15','Break','','meals'),
   E('16:15','17:00','Study Session','','study'),
   E('17:00','17:30','Free Time','','free'),
   E('17:30','18:00','Evening Prayer','','prayer'),
   E('18:00','19:00','Dinner: Burwash','Dinner','meals','','Burwash Hall'),
   E('19:00','20:30','Free','','free')
 ]},
 { n: 14, weekday: 'Sunday', dnum: '16', phase: 'canada', theme: 'Closing Celebration - Check out Day 11:00', city: 'Toronto, ON', date: 'Sunday, August 16', events: [
   E('07:30','08:45','Breakfast: Burwash','Breakfast','meals','','Burwash Hall'),
   E('08:45','10:30','Closing Celebration -Supported Becca in Liturgy.','Closing Celebration','prayer','Becca'),
   E('10:30','20:30','Departures','','travel')
 ]}
];
function segOf(s) { return s < 750 ? 'morning' : s < 1050 ? 'afternoon' : 'evening'; }
return { CATS, PHASES, DAYS, segOf };
})();

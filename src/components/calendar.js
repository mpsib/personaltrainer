import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';

export default function Calendar(props){

    return (
        <FullCalendar
            headerToolbar={{ end: 'dayGridMonth,timeGridWeek,timeGridDay', 
                center: 'title', start:'prev,next today'}}
            plugins={[ dayGridPlugin, timeGridPlugin ]}
            initialView='dayGridMonth'
            events={props.events}
        />
    );
}
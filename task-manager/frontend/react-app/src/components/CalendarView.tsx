import { Box, Spinner, Flex, Heading } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

type Props = {
  tasks: any[];
};

moment.locale("es");
const localizer = momentLocalizer(moment);

const CalendarView = ({ tasks }: Props) => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const formattedEvents: any[] = tasks.map((task) => ({
      title: task.title,
      start: new Date(task.creation_date),
      end: new Date(task.dueDate),
      priority: task.priority,
    }));
    setEvents(formattedEvents);
  }, [tasks]);

  const eventStyleGetter = (event: any) => {
    let backgroundColor = "gray";

    switch (event.priority) {
      case "ALTA":
        backgroundColor = "red";
        break;
      case "MEDIA":
        backgroundColor = "orange";
        break;
      case "BAJA":
        backgroundColor = "green";
        break;
      default:
        break;
    }

    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "5px",
      },
    };
  };

  return (
    <Flex direction={"row"} gap={6} p={6} paddingLeft={20} pt={1} h={"100vh"}>
      {events.length === 0 ? (
        <Spinner />
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          style={{ height: 620, width: "100%" }}
          messages={{
            today: "Hoy",
            previous: "Anterior",
            next: "Siguiente",
            month: "Mes",
            week: "Semana",
            day: "Día",
          }}
        />
      )}
    </Flex>
  );
};

export default CalendarView;
